# Modern Electronics – AI Google Review Assistant

[![Deploy to GitHub Pages](https://github.com/Harrykalsi24/Review-AI/actions/workflows/deploy.yml/badge.svg)](https://github.com/Harrykalsi24/Review-AI/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://harrykalsi24.github.io/Review-AI/)

> 🌐 **Live Demo**: [https://harrykalsi24.github.io/Review-AI/](https://harrykalsi24.github.io/Review-AI/)

A mobile-first web application that helps genuine customers at **Modern Electronics** (Mukerian, Punjab, India) write honest, natural Google reviews using AI assistance.

## About
- 📱 **Mobile-First**: Designed for quick kiosk and phone use
- 🛒 **Interactive Selection**: Category-specific products and customer impressions
- 🤖 **AI-Powered**: Generates human, varied, contextual review drafts
- ✏️ **Customer In Control**: Edit, re-rate, or regenerate before posting
- 📋 **One-Tap Actions**: Copy review text & direct redirect to Google Maps listing
- ⚙️ **Admin Panel**: Tap settings icon 5x to customize branding, AI provider, and offerings

## Live Website
- **URL**: `https://harrykalsi24.github.io/Review-AI/`
- **Hosted On**: GitHub Pages (via GitHub Actions)

## Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide Icons

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Configuration

### Admin Settings
On the main screen, tap the **Settings icon** in the bottom-right corner **5 times** to access Admin Settings (PIN: `1234`).

Configure:
1. **Business Info** – name, address, logo URL
2. **Google Review URL** – paste your Google review link
3. **AI Settings** – API key, model, base URL (OpenRouter or OpenAI)

### Recommended AI Providers
- **OpenRouter**: https://openrouter.ai (supports many models, pay-per-use)
  - Base URL: `https://openrouter.ai/api/v1`
  - Model: `openai/gpt-4o-mini`
- **OpenAI**: https://platform.openai.com
  - Base URL: `https://api.openai.com/v1`
  - Model: `gpt-4o-mini`

## License
MIT
