# Portfolio Website

A modern, interactive portfolio website for Himanshu Pratap Singh — showcasing full-stack development expertise across Angular, React, Node.js, and AI integrations.

## 🚀 Features

- **Modern UI** - Sleek dark theme with gradient accents and smooth animations
- **Interactive Elements** - Custom cursor, parallax effects, 3D card transforms
- **Responsive Design** - Mobile-first approach, works on all devices
- **Terminal Emulator** - Fun interactive terminal with custom commands
- **Theme Switcher** - Multiple color themes (Midnight, Ocean, Sunset, Forest)
- **Particle Effects** - Animated backgrounds and canvas-based visualizations
- **Contact Form** - Mailto-based form (no backend required)
- **Performance** - Lightweight, no heavy dependencies, optimized animations
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── main.css           # Core styles
│   ├── components.css     # Component-specific styles
│   └── visual.css         # Visual effects and animations
├── js/
│   ├── data.js            # Content and configuration
│   ├── interactions.js    # Interactive features
│   ├── interactive.js     # Terminal and modals
│   ├── visual.js          # Canvas animations
│   └── animations.js      # Page animations and effects
├── photo.jpeg             # Profile photo
├── README.md              # This file
├── SECURITY.md            # Security policy
└── .gitignore             # Git ignore rules
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
| `` ` `` | Open terminal |
| `t` | Cycle theme |
| `g` then `c` | Jump to contact |
| `Esc` | Close modals |

### Terminal Commands
- `help` - Show available commands
- `about` - About me
- `skills` - Tech stack
- `projects` - Project list
- `experience` - Work history
- `resume` - Open resume
- `theme [name]` - Change theme
- `clear` - Clear terminal

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security

See [SECURITY.md](./SECURITY.md) for security policies and best practices.

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
- Location: Pune, India

---

**Last Updated:** May 2025
