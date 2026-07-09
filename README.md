# Portfolio Website

A modern, interactive portfolio website for Himanshu Pratap Singh — showcasing full-stack development expertise across Angular, React, Node.js, and AI integrations.

## 🚀 Features

- **Modern UI** - Sleek dark theme with gradient accents and smooth animations
- **Interactive Elements** - Custom cursor, parallax effects, 3D card transforms
- **Responsive Design** - Mobile-first approach, works on all devices
- **AI Assistant** - Live chat (LLaMA 3.3 via a Cloudflare Worker proxy) that answers questions about skills, projects, and experience
- **Theme Switcher** - Multiple color themes (Midnight, Ocean, Sunset, Forest)
- **Particle Effects** - Animated backgrounds and canvas-based visualizations
- **Contact Cards** - Email, LinkedIn, phone, and GitHub links (no backend required)
- **Performance** - Lightweight, no heavy dependencies, optimized animations
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Core styles
│   ├── components.css     # Component-specific styles
│   ├── visual.css         # Visual effects and animations
│   ├── universe-command.css # Skills constellation & AI command center styles
│   └── ai-agent.css       # AI chat panel styles
├── js/
│   ├── data.js            # Content and configuration (edit this to update the site)
│   ├── interactions.js    # Interactive features
│   ├── interactive.js     # Modals, resume, shortcuts, toasts
│   ├── visual.js          # Canvas animations
│   ├── animations.js      # Page animations and effects
│   ├── skills-universe.js # Skills constellation visualization
│   ├── ai-command-center.js # Neural-network hero visualization
│   └── ai-agent.js        # AI chat assistant (talks to the Cloudflare Worker)
├── cloudflare-worker.js    # AI proxy Worker (deployed separately, holds the API key)
├── resume/                 # Downloadable resume PDF
├── photo.jpeg              # Profile photo
├── README.md               # This file
└── .gitignore              # Git ignore rules
```

## 🛠️ Setup

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

2. Serve locally (Python):
   ```bash
   python -m http.server 8000
   ```
   Or with Node.js:
   ```bash
   npx http-server
   ```

3. Open in browser:
   ```
   http://localhost:8000
   ```

## 🌐 Deployment

### Option 1: GitHub Pages (Recommended - Free)
1. Create a GitHub repository: `portfolio`
2. Push code to main branch
3. Go to **Settings → Pages → Source**
4. Select "Deploy from branch" → "main" → "/(root)" → Save
5. Your site will be live at: `https://YOUR_USERNAME.github.io/portfolio`

### Option 2: Netlify (Free with Custom Domain)
1. Connect your GitHub repository
2. Build command: (leave empty - static site)
3. Publish directory: `/` (root)
4. Deploy

### Option 3: Vercel
1. Connect GitHub repository
2. Framework: Other (static)
3. Deploy

## 🎨 Customization

### Update Content
Edit `js/data.js` to update:
- Personal information
- Experience and skills
- Projects portfolio
- Certifications
- Contact information
- Theme colors

### Change Colors
Modify theme definitions in `js/interactive.js`:
```javascript
const THEMES = {
  midnight: {
    vars: {
      '--bg':'#0b0f1a',
      '--accent':'#4f8ef7',
      // ... other colors
    }
  }
};
```

### Add New Sections
1. Add HTML section in `index.html`
2. Add canvas element if needed
3. Add data in `js/data.js`
4. Add render function
5. Add styles in CSS files

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `?` | Show shortcuts |
| `t` | Cycle theme |
| `g` then `c` | Jump to contact |
| `Esc` | Close modals |

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security

### Key Security Features:
- Content Security Policy (CSP) enabled
- HTML escaping on user input
- No external API keys in code
- HTTPS enforced on GitHub Pages/Netlify

## 📊 Performance

- **Lighthouse Score**: 95+
- **Page Size**: ~200KB (optimized)
- **Load Time**: <1s on good connection
- **No external dependencies** (vanilla JavaScript)

## 🐛 Known Issues & Future Enhancements

- [ ] Add dark mode detection (prefers-color-scheme)
- [ ] Optimize canvas performance on lower-end devices
- [ ] Add service worker for offline support
- [ ] Internationalization (i18n)

## 📝 License

MIT License - Feel free to fork and customize for your own portfolio.

## 👤 Author

**Himanshu Pratap Singh**
- Email: himanshupsingh47@gmail.com
- LinkedIn: [linkedin.com/in/himanshupratapsingh](https://www.linkedin.com/in/himanshupratapsingh/)
- GitHub: [github.com/himanshupsingh-dev](https://github.com/himanshupsingh-dev)
- Location: Pune, India

---

**Last Updated:** July 2026
