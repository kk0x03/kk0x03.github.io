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
  help: {
    desc: 'Show help',
    run: showHelp
  }
}

async function initProject(): Promise<void> {
  const targetDir = cwd
  const projectName = path.basename(targetDir)

  // Check if directory is empty or only has .git
  const files = fs.readdirSync(targetDir).filter(f => f !== '.git')
  if (files.length > 0) {
    console.log('\n❌ Directory is not empty')
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

    // Move files from temp to current dir
    const tempFiles = fs.readdirSync(tempDir)
    for (const file of tempFiles) {
      if (file === '.git') continue
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

    // Update _config.yml
    const configPath = path.join(targetDir, '_config.yml')
    let config = fs.readFileSync(configPath, 'utf-8')
    config = config.replace(/root: \/blog\//, `root: /${projectName}/`)
    fs.writeFileSync(configPath, config)

    // Update vite.config.ts
    const vitePath = path.join(targetDir, 'vite.config.ts')
    let viteConfig = fs.readFileSync(vitePath, 'utf-8')
    viteConfig = viteConfig.replace(/base: '\/blog\/'/, `base: '/${projectName}/'`)
    fs.writeFileSync(vitePath, viteConfig)

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

    // Update _config.yml
    const configPath = path.join(targetDir, '_config.yml')
    let config = fs.readFileSync(configPath, 'utf-8')
    config = config.replace(/root: \/blog\//, `root: /${projectName}/`)
    fs.writeFileSync(configPath, config)

    // Update vite.config.ts
    const vitePath = path.join(targetDir, 'vite.config.ts')
    let viteConfig = fs.readFileSync(vitePath, 'utf-8')
    viteConfig = viteConfig.replace(/base: '\/blog\/'/, `base: '/${projectName}/'`)
    fs.writeFileSync(vitePath, viteConfig)

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
    help           Show this help

  Examples:
    kip init
    kip create my-portfolio
    kip dev
    kip build
    kip deploy
    kip new project
`)
}

// Run command
if (!command || !commands[command]) {
  showHelp()
} else {
  commands[command].run()
}
