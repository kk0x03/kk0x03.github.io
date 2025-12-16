#!/usr/bin/env tsx

/**
 * Kip - A simple blog framework
 * Usage: kip <command>
 */

import { spawn, ChildProcess, execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageDir = path.resolve(__dirname, '..')
const cwd = process.env.KIP_CWD || process.cwd()

// Check if we're in a Kip project directory
const isInProject = fs.existsSync(path.join(cwd, '_config.yml')) &&
                    fs.existsSync(path.join(cwd, 'package.json'))

const command = process.argv[2]
const subCommand = process.argv[3]

function ask(rl: readline.Interface, question: string, defaultVal = ''): Promise<string> {
  const prompt = defaultVal ? `${question} (${defaultVal}): ` : `${question}: `
  return new Promise(resolve => {
    rl.question(prompt, answer => {
      resolve(answer.trim() || defaultVal)
    })
  })
}

interface Command {
  desc: string
  run: () => void | Promise<void>
}

const commands: Record<string, Command> = {
  init: {
    desc: 'Initialize Kip in current directory',
    run: initProject
  },
  create: {
    desc: 'Create a new Kip project',
    run: createProject
  },
  dev: {
    desc: 'Start development server',
    run: () => runScript('dev')
  },
  build: {
    desc: 'Build for production',
    run: () => runScript('build')
  },
  preview: {
    desc: 'Preview production build',
    run: () => runScript('preview')
  },
  deploy: {
    desc: 'Deploy to GitHub Pages',
    run: deploy
  },
  new: {
    desc: 'Create new project entry',
    run: () => {
      if (!subCommand || subCommand === 'project') {
        newProject()
      } else {
        console.log(`\n❌ Unknown type: ${subCommand}`)
        console.log('Usage: kip new [project]\n')
      }
    }
  },
  update: {
    desc: 'Update Kip CLI and project files',
    run: update
  },
  help: {
    desc: 'Show help',
    run: showHelp
  }
}

async function initProject(): Promise<void> {
  const targetDir = cwd
  const projectName = path.basename(targetDir)

  // Check if directory is empty or only has git-related files
  const allowedFiles = ['.git', '.github', '.gitignore', '.DS_Store']
  const files = fs.readdirSync(targetDir).filter(f => !allowedFiles.includes(f))
  if (files.length > 0) {
    console.log('\n❌ Directory is not empty')
    console.log('Found:', files.join(', '))
    console.log('Run kip init in an empty directory, or use kip create <name>\n')
    return
  }

  console.log(`\n📦 Initializing Kip project in ${targetDir}...\n`)

  try {
    // Clone to temp, then copy files
    const tempDir = path.join(targetDir, '.kip-temp')
    execSync(`git clone --depth 1 https://github.com/kk0x03/kip.git "${tempDir}"`, {
      stdio: 'inherit'
    })

    // Move files from temp to current dir (preserve user's existing git files)
    const tempFiles = fs.readdirSync(tempDir)
    const preserveFiles = ['.git', '.github', '.gitignore']
    for (const file of tempFiles) {
      if (file === '.git') continue
      // Skip if user already has this file and it's in preserve list
      if (preserveFiles.includes(file) && fs.existsSync(path.join(targetDir, file))) {
        continue
      }
      fs.renameSync(path.join(tempDir, file), path.join(targetDir, file))
    }

    // Remove temp directory
    fs.rmSync(tempDir, { recursive: true, force: true })

    // Update package.json name
    const pkgPath = path.join(targetDir, 'package.json')
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    pkg.name = projectName
    delete pkg.repository
    delete pkg.bugs
    delete pkg.homepage
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

    // Default root is '/', user can customize in _config.yml and vite.config.ts if needed

    // Initialize git repo
    const hasGit = fs.existsSync(path.join(targetDir, '.git'))
    if (!hasGit) {
      console.log('Initializing git repository...')
      execSync('git init', { cwd: targetDir, stdio: 'inherit' })
    }
    execSync('git add .', { cwd: targetDir, stdio: 'inherit' })
    execSync('git commit -m "Initial commit from Kip"', { cwd: targetDir, stdio: 'inherit' })

    console.log('\n✅ Project initialized successfully!\n')
    console.log('Next steps:\n')
    console.log('  npm install')
    console.log('  kip dev         # Start development server\n')
    console.log('To push to GitHub:\n')
    console.log(`  gh repo create ${projectName} --public --source=. --push`)
    console.log('  # Or manually:')
    console.log(`  git remote add origin https://github.com/USERNAME/${projectName}.git`)
    console.log('  git push -u origin main\n')
  } catch (error) {
    console.log('\n❌ Failed to initialize project\n')
    console.log('Make sure git is installed and you have internet connection.\n')
  }
}

async function createProject(): Promise<void> {
  const projectName = subCommand

  if (!projectName) {
    console.log('\n❌ Please provide a project name')
    console.log('Usage: kip create <project-name>\n')
    console.log('Example: kip create my-portfolio\n')
    return
  }

  const targetDir = path.resolve(cwd, projectName)

  if (fs.existsSync(targetDir)) {
    console.log(`\n❌ Directory "${projectName}" already exists\n`)
    return
  }

  console.log(`\n📦 Creating Kip project in ${targetDir}...\n`)

  // Clone from GitHub
  try {
    execSync(`git clone --depth 1 https://github.com/kk0x03/kip.git "${targetDir}"`, {
      stdio: 'inherit'
    })

    // Remove .git folder
    const gitDir = path.join(targetDir, '.git')
    fs.rmSync(gitDir, { recursive: true, force: true })

    // Update package.json name
    const pkgPath = path.join(targetDir, 'package.json')
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    pkg.name = projectName
    delete pkg.repository
    delete pkg.bugs
    delete pkg.homepage
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

    // Default root is '/', user can customize in _config.yml and vite.config.ts if needed

    // Initialize git repo
    console.log('Initializing git repository...')
    execSync('git init', { cwd: targetDir, stdio: 'inherit' })
    execSync('git add .', { cwd: targetDir, stdio: 'inherit' })
    execSync('git commit -m "Initial commit from Kip"', { cwd: targetDir, stdio: 'inherit' })

    console.log('\n✅ Project created successfully!\n')
    console.log('Next steps:\n')
    console.log(`  cd ${projectName}`)
    console.log('  npm install')
    console.log('  kip dev         # Start development server\n')
    console.log('To push to GitHub:\n')
    console.log(`  gh repo create ${projectName} --public --source=. --push`)
    console.log('  # Or manually:')
    console.log(`  git remote add origin https://github.com/USERNAME/${projectName}.git`)
    console.log('  git push -u origin main\n')
  } catch (error) {
    console.log('\n❌ Failed to create project\n')
    console.log('Make sure git is installed and you have internet connection.\n')
  }
}

function runScript(name: string): ChildProcess | null {
  if (!isInProject) {
    console.log('\n❌ Not in a Kip project directory')
    console.log('Run this command from your project folder, or create a new project:\n')
    console.log('  kip create my-portfolio\n')
    return null
  }
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  return spawn(npm, ['run', name], { stdio: 'inherit', cwd })
}

function deploy(): void {
  if (!isInProject) {
    console.log('\n❌ Not in a Kip project directory')
    console.log('Run this command from your project folder.\n')
    return
  }

  console.log('\n🚀 Deploying to GitHub Pages...\n')

  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  const build = spawn(npm, ['run', 'build'], { stdio: 'inherit', cwd })

  build.on('close', (code) => {
    if (code !== 0) {
      console.log('\n❌ Build failed\n')
      return
    }

    const git = spawn('git', ['add', '.'], { stdio: 'inherit', cwd })
    git.on('close', () => {
      const commit = spawn('git', ['commit', '-m', 'Deploy'], { stdio: 'inherit', cwd })
      commit.on('close', () => {
        const push = spawn('git', ['push'], { stdio: 'inherit', cwd })
        push.on('close', (pushCode) => {
          if (pushCode === 0) {
            console.log('\n✅ Deployed! Check GitHub Actions for status.\n')
          }
        })
      })
    })
  })
}

async function newProject(): Promise<void> {
  if (!isInProject) {
    console.log('\n❌ Not in a Kip project directory')
    console.log('Run this command from your project folder.\n')
    return
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  console.log('\n📦 Create New Project Entry\n')

  const title = await ask(rl, 'Title')
  if (!title) {
    console.log('❌ Title is required\n')
    rl.close()
    return
  }

  const description = await ask(rl, 'Description', '')
  const link = await ask(rl, 'External link (or leave empty for local content)', '')
  const image = await ask(rl, 'Image path', '')
  const tagsInput = await ask(rl, 'Tags (comma separated)', '')
  const orderInput = await ask(rl, 'Order', '99')
  const draftInput = await ask(rl, 'Draft? (y/n)', 'n')

  rl.close()

  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : []
  const order = parseInt(orderInput) || 99
  const draft = draftInput.toLowerCase() === 'y'

  const projectsDir = path.join(cwd, 'projects')
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true })
  }

  const filePath = path.join(projectsDir, `${slug}.md`)
  if (fs.existsSync(filePath)) {
    console.log(`\n❌ Project already exists: ${slug}.md\n`)
    return
  }

  let content = '---\n'
  content += `title: ${title}\n`
  if (description) content += `description: ${description}\n`
  if (link) content += `link: ${link}\n`
  if (image) content += `image: ${image}\n`
  content += `order: ${order}\n`
  if (tags.length > 0) {
    content += 'tags:\n'
    tags.forEach(tag => {
      content += `  - ${tag}\n`
    })
  }
  content += `draft: ${draft}\n`
  content += '---\n'

  if (!link) {
    content += `
# ${title}

Write about your project here...

## Features

- Feature 1
- Feature 2

## Tech Stack

- Tech 1
- Tech 2
`
  }

  fs.writeFileSync(filePath, content)
  console.log(`\n✅ Created: projects/${slug}.md\n`)

  if (!link) {
    console.log('Edit the file to add your project content.\n')
  }
}

async function update(): Promise<void> {
  console.log('\n🔄 Updating Kip...\n')

  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

  // Update global CLI
  console.log('Updating global Kip CLI...')
  try {
    execSync(`${npm} update -g @kk0x03/kip`, { stdio: 'inherit' })
    console.log('✅ Global CLI updated\n')
  } catch {
    console.log('⚠️  Could not update global CLI (may not be installed globally)\n')
  }

  // Update local project if in a kip project
  if (isInProject) {
    console.log('Updating local project files...\n')

    const tempDir = path.join(cwd, '.kip-update-temp')

    try {
      // Clone latest version
      execSync(`git clone --depth 1 https://github.com/kk0x03/kip.git "${tempDir}"`, {
        stdio: 'pipe'
      })

      // Files to update (core framework files, not user content)
      const filesToUpdate = [
        'src/components',
        'src/styles',
        'src/types',
        'src/App.tsx',
        'src/main.tsx',
        'scripts/build-content.ts',
        '.github/workflows'
      ]

      for (const file of filesToUpdate) {
        const srcPath = path.join(tempDir, file)
        const destPath = path.join(cwd, file)

        if (fs.existsSync(srcPath)) {
          // Remove old file/directory
          if (fs.existsSync(destPath)) {
            fs.rmSync(destPath, { recursive: true, force: true })
          }

          // Copy new file/directory
          if (fs.statSync(srcPath).isDirectory()) {
            fs.cpSync(srcPath, destPath, { recursive: true })
          } else {
            fs.copyFileSync(srcPath, destPath)
          }
          console.log(`  Updated: ${file}`)
        }
      }

      // Clean up
      fs.rmSync(tempDir, { recursive: true, force: true })

      console.log('\n✅ Local project updated!\n')
      console.log('Your content files (projects/, _config.yml) were preserved.')
      console.log('Run "npm install" if there are dependency changes.\n')
    } catch (error) {
      // Clean up on error
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true })
      }
      console.log('❌ Failed to update local project\n')
      console.log('Make sure you have internet connection.\n')
    }
  } else {
    console.log('Not in a Kip project - only global CLI was updated.\n')
  }
}

function showHelp(): void {
  console.log(`
  ╔═══════════════════════════════════════╗
  ║             Kip Framework             ║
  ╚═══════════════════════════════════════╝

  Usage: kip <command>

  Commands:
    init           Initialize Kip in current directory
    create <name>  Create a new Kip project in new folder
    dev            Start development server
    build          Build for production
    preview        Preview production build
    deploy         Build and push to GitHub
    new [project]  Create new project entry (interactive)
    update         Update Kip CLI and local project files
    help           Show this help

  Examples:
    kip init
    kip create my-portfolio
    kip dev
    kip build
    kip deploy
    kip new project
    kip update
`)
}

// Run command
if (!command || !commands[command]) {
  showHelp()
} else {
  commands[command].run()
}
