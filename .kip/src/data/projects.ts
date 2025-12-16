// Auto-generated - do not edit

import type { Project } from '../types'

export const projects: Project[] = [
  {
    "id": "IAmListening",
    "title": "IAmListening",
    "description": "一个以端侧优先、低延迟与隐私保护为核心的实时声音理解系统，面向助听器、儿童手表等弱势群体设备。",
    "image": "images/IAmListening.jpg",
    "order": 1,
    "tags": [
      "featured",
      "ai",
      "edge",
      "streaming",
      "ai-for-good"
    ],
    "draft": false,
    "content": "# IAmListening\n\n**IAmListening** 是一个在 **Google Hackathon（AI for Good）** 期间完成的端侧实时声音理解系统，目标是为 **助听器、儿童手表等传统弱势群体设备** 提供智能化的环境感知与语音交互能力。\n\n在真实语音交互场景中，当系统响应延迟超过 **500–800ms** 时，用户会明显感知到迟钝。  \n因此，本项目以 **低延迟、隐私保护、功耗受限设备可部署** 为核心约束，设计了一套 **端侧优先（Edge-first）** 的全链路流式语音处理架构，整体目标 **RTF ≈ 0.5**。\n\n---\n\n## Features\n\n- **端侧环境声音理解（非仅人声）**  \n  基于轻量化模型在端侧进行环境声音分类，支持对真实生活场景中的声音事件进行识别，而不仅限于传统 VAD 的“是否有人说话”。\n\n- **全链路流式语音交互（Full Duplex Streaming）**  \n  ASR → LLM → TTS 采用流式并行处理，不等待完整语句或完整音频生成，显著降低体感延迟。\n\n- **实时打断（Barge-in）机制**  \n  支持用户在设备播报过程中随时插话，系统可即时中断 TTS 与 LLM 输出并重新进入监听状态，交互体验更接近自然对话。\n\n- **隐私优先架构设计**  \n  声音预处理与 ASR 尽量在端侧完成，仅在事件确认后才触发云端大模型处理，降低隐私风险与云端依赖。\n\n- **弱网与低功耗友好**  \n  架构设计适配弱网环境与算力受限设备，适用于穿戴设备与嵌入式场景。\n\n---\n\n## Tech Stack\n\n- **端侧 / 音频处理**\n  - ESP32\n  - YAMNet（环境声音分类）\n  - Whisper CoreML / Faster-Whisper（准流式 ASR）\n\n- **流式与通信**\n  - WebSocket\n  - Full Duplex Streaming Pipeline\n\n- **语音合成**\n  - iOS 内置 TTS（低延迟、本地执行）\n\n- **系统架构**\n  - Edge-first 架构\n  - 事件驱动处理模型\n  - RTF（Real-Time Factor）优化",
    "html": "<h1>IAmListening</h1>\n<p><strong>IAmListening</strong> 是一个在 <strong>Google Hackathon（AI for Good）</strong> 期间完成的端侧实时声音理解系统，目标是为 <strong>助听器、儿童手表等传统弱势群体设备</strong> 提供智能化的环境感知与语音交互能力。</p>\n<p>在真实语音交互场景中，当系统响应延迟超过 <strong>500–800ms</strong> 时，用户会明显感知到迟钝。<br>因此，本项目以 <strong>低延迟、隐私保护、功耗受限设备可部署</strong> 为核心约束，设计了一套 <strong>端侧优先（Edge-first）</strong> 的全链路流式语音处理架构，整体目标 <strong>RTF ≈ 0.5</strong>。</p>\n<hr>\n<h2>Features</h2>\n<ul>\n<li><p><strong>端侧环境声音理解（非仅人声）</strong><br>基于轻量化模型在端侧进行环境声音分类，支持对真实生活场景中的声音事件进行识别，而不仅限于传统 VAD 的“是否有人说话”。</p>\n</li>\n<li><p><strong>全链路流式语音交互（Full Duplex Streaming）</strong><br>ASR → LLM → TTS 采用流式并行处理，不等待完整语句或完整音频生成，显著降低体感延迟。</p>\n</li>\n<li><p><strong>实时打断（Barge-in）机制</strong><br>支持用户在设备播报过程中随时插话，系统可即时中断 TTS 与 LLM 输出并重新进入监听状态，交互体验更接近自然对话。</p>\n</li>\n<li><p><strong>隐私优先架构设计</strong><br>声音预处理与 ASR 尽量在端侧完成，仅在事件确认后才触发云端大模型处理，降低隐私风险与云端依赖。</p>\n</li>\n<li><p><strong>弱网与低功耗友好</strong><br>架构设计适配弱网环境与算力受限设备，适用于穿戴设备与嵌入式场景。</p>\n</li>\n</ul>\n<hr>\n<h2>Tech Stack</h2>\n<ul>\n<li><p><strong>端侧 / 音频处理</strong></p>\n<ul>\n<li>ESP32</li>\n<li>YAMNet（环境声音分类）</li>\n<li>Whisper CoreML / Faster-Whisper（准流式 ASR）</li>\n</ul>\n</li>\n<li><p><strong>流式与通信</strong></p>\n<ul>\n<li>WebSocket</li>\n<li>Full Duplex Streaming Pipeline</li>\n</ul>\n</li>\n<li><p><strong>语音合成</strong></p>\n<ul>\n<li>iOS 内置 TTS（低延迟、本地执行）</li>\n</ul>\n</li>\n<li><p><strong>系统架构</strong></p>\n<ul>\n<li>Edge-first 架构</li>\n<li>事件驱动处理模型</li>\n<li>RTF（Real-Time Factor）优化</li>\n</ul>\n</li>\n</ul>\n",
    "source": "markdown"
  },
  {
    "id": "ImpactiPariWebsite(VibeCoding)",
    "title": "ImpactiPari Website",
    "description": "一个完全通过 Vibe Coding 方式交付的企业官网项目，从需求到上线未编写任何业务代码。",
    "image": "images/impactipari.png",
    "order": 2,
    "tags": [
      "featured",
      "vibe-coding",
      "ai-engineering",
      "web"
    ],
    "draft": false,
    "content": "# ImpactiPari Website\n\n**ImpactiPari Website** 是我为朋友公司交付的一个 **真实上线的企业官网项目**，该项目最大的特点是：  \n**从需求分析、架构设计、代码实现到部署上线，全程未编写任何一行业务代码**，完全通过 **Vibe Coding + AI 工程化协作** 完成。\n\n项目采用 **Claude Code** 作为主要 AI 编程代理，负责前端页面、工程结构与逻辑实现；  \n基础设施层面使用 **阿里云进行部署**，并通过 **Google 提供域名服务** 完成公网访问。\n\n该项目验证了 **“AI + 规范 + 人类审查”** 的协作模式在真实生产环境中的可行性。\n\n---\n\n## Features\n\n- **零代码交付（Zero Manual Coding）**  \n  项目未直接编写任何业务代码，所有代码均由 Claude Code 根据规格与上下文生成，人类只负责需求拆解、规范约束与结果校验。\n\n- **Vibe Coding 工作流实践**  \n  通过明确的页面结构、交互描述与设计意图，让 AI 按“氛围 + 约束”生成工程代码，而非逐行指令式编程。\n\n- **真实商业网站上线**  \n  项目最终以正式官网形式交付并上线运行，而非 Demo 或实验项目。\n\n- **端到端 AI 驱动开发流程**  \n  覆盖需求 → 页面结构 → 实现 → 部署 → 域名配置的完整交付链路。\n\n---\n\n## Tech Stack\n\n- **AI Coding / Agent**\n  - Claude Code（核心代码生成与工程搭建）\n  - Vibe Coding 协作模式\n\n- **前端工程**\n  - AI 自动生成的 Web 前端工程\n  - 响应式页面与基础交互\n\n- **部署与基础设施**\n  - 阿里云（服务器与部署环境）\n  - Google Domains（域名解析与管理）\n\n- **工程方法**\n  - 规范驱动（Spec-first）\n  - 人类 Review + AI 执行\n\n---\n\n## What I Learned\n\n- AI Coding 已可以在 **明确规格约束下完成完整 Web 项目交付**\n- 人类角色正在从“写代码”转变为：\n  - 需求建模\n  - 规格设计\n  - 结果验证\n- Vibe Coding 在 **内容型 / 官网类项目** 中具备极高性价比\n\n---\n\n## Links\n\n- [Live Website](https://www.impactipari.com/en)",
    "html": "<h1>ImpactiPari Website</h1>\n<p><strong>ImpactiPari Website</strong> 是我为朋友公司交付的一个 <strong>真实上线的企业官网项目</strong>，该项目最大的特点是：<br><strong>从需求分析、架构设计、代码实现到部署上线，全程未编写任何一行业务代码</strong>，完全通过 <strong>Vibe Coding + AI 工程化协作</strong> 完成。</p>\n<p>项目采用 <strong>Claude Code</strong> 作为主要 AI 编程代理，负责前端页面、工程结构与逻辑实现；<br>基础设施层面使用 <strong>阿里云进行部署</strong>，并通过 <strong>Google 提供域名服务</strong> 完成公网访问。</p>\n<p>该项目验证了 <strong>“AI + 规范 + 人类审查”</strong> 的协作模式在真实生产环境中的可行性。</p>\n<hr>\n<h2>Features</h2>\n<ul>\n<li><p><strong>零代码交付（Zero Manual Coding）</strong><br>项目未直接编写任何业务代码，所有代码均由 Claude Code 根据规格与上下文生成，人类只负责需求拆解、规范约束与结果校验。</p>\n</li>\n<li><p><strong>Vibe Coding 工作流实践</strong><br>通过明确的页面结构、交互描述与设计意图，让 AI 按“氛围 + 约束”生成工程代码，而非逐行指令式编程。</p>\n</li>\n<li><p><strong>真实商业网站上线</strong><br>项目最终以正式官网形式交付并上线运行，而非 Demo 或实验项目。</p>\n</li>\n<li><p><strong>端到端 AI 驱动开发流程</strong><br>覆盖需求 → 页面结构 → 实现 → 部署 → 域名配置的完整交付链路。</p>\n</li>\n</ul>\n<hr>\n<h2>Tech Stack</h2>\n<ul>\n<li><p><strong>AI Coding / Agent</strong></p>\n<ul>\n<li>Claude Code（核心代码生成与工程搭建）</li>\n<li>Vibe Coding 协作模式</li>\n</ul>\n</li>\n<li><p><strong>前端工程</strong></p>\n<ul>\n<li>AI 自动生成的 Web 前端工程</li>\n<li>响应式页面与基础交互</li>\n</ul>\n</li>\n<li><p><strong>部署与基础设施</strong></p>\n<ul>\n<li>阿里云（服务器与部署环境）</li>\n<li>Google Domains（域名解析与管理）</li>\n</ul>\n</li>\n<li><p><strong>工程方法</strong></p>\n<ul>\n<li>规范驱动（Spec-first）</li>\n<li>人类 Review + AI 执行</li>\n</ul>\n</li>\n</ul>\n<hr>\n<h2>What I Learned</h2>\n<ul>\n<li>AI Coding 已可以在 <strong>明确规格约束下完成完整 Web 项目交付</strong></li>\n<li>人类角色正在从“写代码”转变为：<ul>\n<li>需求建模</li>\n<li>规格设计</li>\n<li>结果验证</li>\n</ul>\n</li>\n<li>Vibe Coding 在 <strong>内容型 / 官网类项目</strong> 中具备极高性价比</li>\n</ul>\n<hr>\n<h2>Links</h2>\n<ul>\n<li><a href=\"https://www.impactipari.com/en\">Live Website</a></li>\n</ul>\n",
    "source": "markdown"
  },
  {
    "id": "DockerfileAgent",
    "title": "Dockerfile Agent",
    "description": "一个基于 RAG 与 Agent 架构的 Dockerfile 自动生成系统，将最佳实践、环境约束与工程规范注入到 AI 生成流程中。",
    "order": 3,
    "tags": [
      "featured",
      "ai-agent",
      "rag",
      "devops",
      "vibe-coding"
    ],
    "draft": false,
    "content": "# Dockerfile Agent\n\n**Dockerfile Agent** 是一个面向真实工程场景的 **AI 驱动 Dockerfile 生成系统**，目标是解决传统 LLM 在基础设施代码生成中常见的 **不安全、不规范、不可复用** 问题。\n\n不同于“直接让模型写 Dockerfile”，该项目通过 **RAG + Agent 架构**，将 **Docker 官方最佳实践、组织级规范、运行环境约束** 注入到生成流程中，使 AI 生成结果 **可落地、可审计、可持续演进**。\n\n---\n\n## Background\n\n在实际 DevOps / 平台工程中，Dockerfile 往往存在以下问题：\n\n- 不同项目风格不一致，维护成本高\n- AI 直接生成的 Dockerfile：\n  - 镜像体积大\n  - 安全隐患多\n  - 不符合组织规范\n- 很难复用历史经验与最佳实践\n\n因此我设计并实现了 **Dockerfile Agent**，让 AI 在“被约束的前提下”生成工程级 Dockerfile。\n\n---\n\n## Features\n\n- **Agent 化 Dockerfile 生成流程**  \n  将 Dockerfile 生成拆解为多个受控步骤（基础镜像选择、依赖安装、构建优化、安全加固等），由 Agent 按规则逐步执行。\n\n- **RAG 驱动的规范注入**  \n  通过检索 Docker 官方文档、内部规范与历史模板，将最佳实践动态注入到生成上下文中，而不是依赖模型“记忆”。\n\n- **规范优先（Spec-first）设计**  \n  生成前明确约束运行时环境、语言版本、镜像策略与安全要求，避免一次性生成带来的不可控结果。\n\n- **Vibe Coding 协作模式**  \n  人类负责描述工程意图与约束，Agent 负责实现细节，显著降低 Dockerfile 编写与 review 成本。\n\n- **可演进的工程能力**  \n  新规范、新最佳实践可通过更新知识库即时生效，无需重新训练模型。\n\n---\n\n## Tech Stack\n\n- **AI / Agent**\n  - LLM + Agent 架构\n  - 任务拆解与多阶段推理\n  - 工具调用（文件生成、校验）\n\n- **RAG**\n  - Docker 官方文档\n  - Dockerfile 最佳实践\n  - 历史模板与组织规范\n\n- **工程与 DevOps**\n  - Docker / OCI\n  - 多语言运行时（Node.js / Go / Python）\n  - 镜像构建与优化策略\n\n- **方法论**\n  - Spec-first\n  - Vibe Coding\n  - 人类 Review + AI 执行\n\n---\n\n## What I Learned\n\n- **基础设施代码非常适合 Agent 化**\n- RAG 是让 AI 输出“工程可用代码”的关键，而不是可选项\n- 人类的价值不在“写 Dockerfile”，而在于：\n  - 规则定义\n  - 约束建模\n  - 结果评估",
    "html": "<h1>Dockerfile Agent</h1>\n<p><strong>Dockerfile Agent</strong> 是一个面向真实工程场景的 <strong>AI 驱动 Dockerfile 生成系统</strong>，目标是解决传统 LLM 在基础设施代码生成中常见的 <strong>不安全、不规范、不可复用</strong> 问题。</p>\n<p>不同于“直接让模型写 Dockerfile”，该项目通过 <strong>RAG + Agent 架构</strong>，将 <strong>Docker 官方最佳实践、组织级规范、运行环境约束</strong> 注入到生成流程中，使 AI 生成结果 <strong>可落地、可审计、可持续演进</strong>。</p>\n<hr>\n<h2>Background</h2>\n<p>在实际 DevOps / 平台工程中，Dockerfile 往往存在以下问题：</p>\n<ul>\n<li>不同项目风格不一致，维护成本高</li>\n<li>AI 直接生成的 Dockerfile：<ul>\n<li>镜像体积大</li>\n<li>安全隐患多</li>\n<li>不符合组织规范</li>\n</ul>\n</li>\n<li>很难复用历史经验与最佳实践</li>\n</ul>\n<p>因此我设计并实现了 <strong>Dockerfile Agent</strong>，让 AI 在“被约束的前提下”生成工程级 Dockerfile。</p>\n<hr>\n<h2>Features</h2>\n<ul>\n<li><p><strong>Agent 化 Dockerfile 生成流程</strong><br>将 Dockerfile 生成拆解为多个受控步骤（基础镜像选择、依赖安装、构建优化、安全加固等），由 Agent 按规则逐步执行。</p>\n</li>\n<li><p><strong>RAG 驱动的规范注入</strong><br>通过检索 Docker 官方文档、内部规范与历史模板，将最佳实践动态注入到生成上下文中，而不是依赖模型“记忆”。</p>\n</li>\n<li><p><strong>规范优先（Spec-first）设计</strong><br>生成前明确约束运行时环境、语言版本、镜像策略与安全要求，避免一次性生成带来的不可控结果。</p>\n</li>\n<li><p><strong>Vibe Coding 协作模式</strong><br>人类负责描述工程意图与约束，Agent 负责实现细节，显著降低 Dockerfile 编写与 review 成本。</p>\n</li>\n<li><p><strong>可演进的工程能力</strong><br>新规范、新最佳实践可通过更新知识库即时生效，无需重新训练模型。</p>\n</li>\n</ul>\n<hr>\n<h2>Tech Stack</h2>\n<ul>\n<li><p><strong>AI / Agent</strong></p>\n<ul>\n<li>LLM + Agent 架构</li>\n<li>任务拆解与多阶段推理</li>\n<li>工具调用（文件生成、校验）</li>\n</ul>\n</li>\n<li><p><strong>RAG</strong></p>\n<ul>\n<li>Docker 官方文档</li>\n<li>Dockerfile 最佳实践</li>\n<li>历史模板与组织规范</li>\n</ul>\n</li>\n<li><p><strong>工程与 DevOps</strong></p>\n<ul>\n<li>Docker / OCI</li>\n<li>多语言运行时（Node.js / Go / Python）</li>\n<li>镜像构建与优化策略</li>\n</ul>\n</li>\n<li><p><strong>方法论</strong></p>\n<ul>\n<li>Spec-first</li>\n<li>Vibe Coding</li>\n<li>人类 Review + AI 执行</li>\n</ul>\n</li>\n</ul>\n<hr>\n<h2>What I Learned</h2>\n<ul>\n<li><strong>基础设施代码非常适合 Agent 化</strong></li>\n<li>RAG 是让 AI 输出“工程可用代码”的关键，而不是可选项</li>\n<li>人类的价值不在“写 Dockerfile”，而在于：<ul>\n<li>规则定义</li>\n<li>约束建模</li>\n<li>结果评估</li>\n</ul>\n</li>\n</ul>\n",
    "source": "markdown"
  }
]

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id)
}
