<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,50:161b22,100:0d1117&height=200&section=header&text=Art%20Vault&fontSize=60&fontColor=58a6ff&animation=fadeIn&fontAlignY=35&desc=Explore%20The%20Met%20Collection%20%E2%80%94%20471%2C000%2B%20Artworks&descAlignY=55&descSize=18"/>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://art-vault-gilt.vercel.app)
[![Met Museum API](https://img.shields.io/badge/Met%20Museum%20API-Open%20Data-000000?style=for-the-badge)](https://metmuseum.github.io/)

[🌐 Live Demo](https://art-vault-gilt.vercel.app) · [Met API Docs](https://metmuseum.github.io/)

</div>

---

## 🎯 What is Art Vault?

**Art Vault** is a lightweight, interactive web application that lets you explore and discover artworks from The Metropolitan Museum of Art's open collection — over **471,000 pieces** spanning 5,000 years of human history.

Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build steps, no dependencies.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **🔍 Search** | Search across the full Met collection by keyword |
| **🎨 Artwork Cards** | Display image, title, artist, department, and year |
| **⚡ Parallel Fetching** | Batch fetch details using `Promise.all()` |
| **🏛️ Department Filter** | Filter by department (Egyptian Art, Modern Art, Asian Art, etc.) |
| **📅 Year Sorting** | Sort by creation year (oldest → newest / newest → oldest) |
| **🔎 Local Search** | Search within loaded results by title or artist |
| **🌙 Dark Mode** | Toggle with preference saved via `localStorage` |
| **📱 Responsive** | Grid layout adapts to mobile, tablet, and desktop |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│              Browser                     │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │  index.html │  │   style.css     │  │
│  │  (Markup)   │  │  (Dark/Light)   │  │
│  └──────┬──────┘  └─────────────────┘  │
│         │                               │
│         ▼                               │
│  ┌─────────────┐                        │
│  │  script.js  │◄── Promise.all()      │
│  │  (Logic)    │    parallel fetch     │
│  └──────┬──────┘                        │
│         │                               │
│         ▼                               │
│  ┌─────────────────────────────────┐   │
│  │  Met Museum Collection API      │   │
│  │  collectionapi.metmuseum.org    │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## 🚀 Quick Start

No installation or build steps required.

```bash
git clone https://github.com/vishal-k-crypto/art-vault.git
cd art-vault
# Open index.html in any modern browser
open index.html
```

---

## 📁 Project Structure

```
art-vault/
├── index.html      # Main page structure
├── style.css       # Styling + dark/light mode
├── script.js       # Search, filter, sort logic
└── README.md       # This file
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Semantic markup |
| **CSS3** | Grid layout, responsive design, dark mode |
| **Vanilla JS** | API calls, DOM manipulation, localStorage |
| **Met Museum API** | Open REST API — no auth required |

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with** 🏛️ **The Met API** · 🎨 **Vanilla JS** · 🌙 **Dark Mode**

</div>
