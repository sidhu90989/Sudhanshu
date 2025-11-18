# 🚀 Sudhanshu Suryawanshi – Modern 3D Portfolio

A stunning, cinematic portfolio website featuring interactive 3D visuals, smooth scroll animations, neon glow effects, and modern UI/UX design. Built with cutting-edge web technologies for an immersive user experience.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Three.js](https://img.shields.io/badge/Three.js-0.160-black?style=for-the-badge&logo=three.js)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 🎨 Visual Design
- **Neon Glow Effects** - Pulsing neon circle around profile image with cyan/purple gradients
- **Animated Mesh Gradient Background** - Dynamic color-shifting background
- **Custom Cursor** - Interactive cursor with magnetic button effects
- **Glassmorphism UI** - Frosted glass effects on cards and sections
- **Cinematic Hero Section** - Full-screen immersive introduction with split layout

### 🎬 Animations
- **GSAP ScrollTrigger** - Smooth scroll-based reveals and parallax effects
- **Typed.js Animation** - Auto-typing text effect for job titles
- **Line-by-Line Reveals** - Elegant text entrance animations
- **Staggered Fade-ins** - Sequential content animations
- **Horizontal Project Scroll** - Cinematic project showcase
- **Particle Field** - Physics-driven particles reacting to mouse movement

### 🎮 Interactive Elements
- **Three.js 3D Scene** - WebGL-powered background with 3D models
- **Magnetic Buttons** - Elements that follow cursor on hover
- **Social Media Icons** - Animated hover effects with rotation
- **Smooth Navigation** - Seamless section transitions
- **Modal System** - Project detail overlays with focus trap

### 📱 Responsive & Accessible
- **Mobile-First Design** - Optimized for all screen sizes
- **Touch-Optimized** - Gesture support for mobile devices
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and semantic HTML
- **Reduced Motion Support** - Respects user preferences
- **WebGL Fallbacks** - Graceful degradation for unsupported devices

## 🛠️ Technologies

**Frontend Framework:**
- Three.js (3D graphics, models, postprocessing)
- GSAP + ScrollTrigger (animations, timelines)
- Vite (bundling, HMR, asset optimization)
- Lenis (smooth scrolling)
- Boxicons (icon library)

**Build Tools:**
- Vite 5.0 (fast bundling)
- Asset hashing for cache optimization
- Code splitting for performance
- ES modules for modern browsers

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
# Opens at http://localhost:5173/
```

### Production Build
```bash
npm run build
# Output in dist/ folder
```

### Preview Production Build
```bash
npm run preview
```

## 📂 Project Structure

```
Sudhanshu/
├── index.html              # Main HTML file
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
│
├── src/                    # JavaScript modules
│   ├── main.js            # Entry point & initialization
│   ├── three-scene.js     # Three.js scene setup
│   ├── animations.js      # GSAP animations
│   ├── ui.js              # DOM interactions & modals
│   └── utils.js           # Helper functions
│
├── styles/                 # CSS stylesheets
│   ├── variables.css      # CSS custom properties
│   └── style.css          # Main styles
│
├── assets/                 # Static assets
│   ├── models/            # 3D models (GLB files)
│   ├── img/               # Images (WebP format)
│   ├── hdr/               # HDR environment maps
│   └── lottie/            # Lottie animations
│
├── meta/                   # Metadata files
│   ├── favicon.svg        # Site icon
│   ├── manifest.json      # PWA manifest
│   └── browserconfig.xml  # Browser config
│
└── dist/                   # Production build (generated)
```

## 🎨 Customization

### Update Personal Information

**1. Profile Photo:**
Replace `/assets/img/profile-photo-optimized.webp` with your photo
```bash
# Optimize your image
cwebp -q 75 your-photo.jpg -o profile-photo-optimized.webp
```

**2. Personal Details:**
Edit in `index.html`:
- Name: Search for "Sudhanshu Suryawanshi"
- Tagline: Update `hero__subtitle`
- Social Links: Update URLs in `social-media` section

**3. Projects:**
Edit `src/ui.js` → `projectsData` array:
```javascript
const projectsData = [
  { 
    id: 1, 
    title: 'Your Project', 
    desc: 'Description', 
    stack: ['React', 'Node.js'], 
    repo: 'github.com/...',
    model: '/assets/models/your-model.glb' 
  }
]
```

**4. Education & Stats:**
- CGPA: `index.html` → stat-item section
- College: `index.html` → about section
- Years: Update stat numbers

**5. Social Media:**
Update links in `index.html`:
```html
<a href="https://github.com/yourhandle">
<a href="https://linkedin.com/in/yourhandle">
<a href="https://instagram.com/yourhandle">
```

### Theme Colors

Edit `styles/variables.css`:
```css
:root {
  --bg: #0a0b0f;              /* Background */
  --text: #dbe4ff;            /* Text color */
  --accent1: #7b2ff7;         /* Purple */
  --accent2: #5d5fe9;         /* Blue */
  --accent3: #3bc8f7;         /* Cyan */
}
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir dist
```

Or drag `dist/` folder to Netlify dashboard

### GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
npm install -g gh-pages
gh-pages -d dist
```

## 🔧 Model Optimization

Optimize 3D models before adding:

```bash
# Install gltf-pipeline
npm install -g gltf-pipeline

# Compress with Draco
gltf-pipeline -i model.glb -o model-optimized.glb --draco.compressionLevel=10 --quantize

# Keep polycount under:
# - Hero scene: < 50k polygons
# - Project models: < 10k polygons
```

**Texture Optimization:**
- Use WebP format for images
- Resize textures: 2K → 1K
- Compress HDR files

## ⚡ Performance Features

- **Code Splitting** - Lazy load modules
- **Asset Hashing** - Efficient caching
- **WebP Images** - Modern image format
- **Draco Compression** - Optimized 3D models
- **Reduced Motion** - Performance mode
- **Progressive Loading** - Load low-poly first
- **RequestIdleCallback** - Non-critical assets
- **Device Pixel Ratio Cap** - Limit to 2x

## 🐛 Debug Mode

Enable debug features:
```
http://localhost:5173/?debug
```

Features:
- FPS meter (top-left)
- Console logging
- Performance monitoring

**Inspect Mode:**
Press `I` key or click Inspect button for:
- Debug overlay
- Model bounds visualization

## 🔐 Security & Privacy

- ✅ No tracking scripts by default
- ✅ No analytics (optional snippet in README)
- ✅ No external API calls
- ✅ Client-side only (static hosting)
- ✅ Form submission stub (configure Netlify/Formspree)

### Optional Analytics

**Google Analytics:**
```html
<!-- Add to <head> after user consent -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

**Plausible (Privacy-friendly):**
```html
<script defer data-domain="yourdomain.com" 
  src="https://plausible.io/js/script.js"></script>
```

## 📧 Contact Form Setup

**Netlify Forms:**
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact">
  <!-- form fields -->
</form>
```

**Formspree:**
```html
<form action="https://formspree.io/f/YOUR_ID" method="POST">
  <!-- form fields -->
</form>
```

## 🎯 Browser Support

- ✅ Chrome 90+ (recommended)
- ✅ Firefox 88+
- ✅ Safari 15+
- ✅ Edge 90+
- ⚠️ WebGL required for 3D features
- ⚠️ JavaScript required

## 📝 License

© 2025 Sudhanshu Suryawanshi. All rights reserved.

Free to use for personal portfolios. Attribution appreciated.

## 🤝 Contributing

Found a bug or want to suggest improvements?
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## 📞 Contact

- GitHub: [@sidhu90989](https://github.com/sidhu90989)
- Email: your-email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourhandle)

## Content Customization
In `index.html` and `src/ui.js` replace placeholders:
| Item | Location |
|------|----------|
| Name | `index.html` hero heading |
| Tagline | `index.html` tagline paragraph |
| Education | `#about` section list |
| Contact Email | JSON-LD + contact form placeholder |
| Social Links | `#contact` section list + JSON-LD sameAs |
| Projects | `src/ui.js` `projectsData` array |
| Degree Badge CGPA | `.degree-badge` spans in `index.html` |
| Repo URLs | `projectsData` entries |

Checklist to update after cloning:
1. Replace favicon (`meta/favicon.svg`).
2. Add real profile photo (replace `assets/img/profile-photo-optimized.webp`).
3. Add proper social links & email.
4. Replace project descriptions/screenshots & models.
5. Update degree badge CGPA value.
6. Add real HDR environment map.
7. Optimize & compress GLB models.
8. Remove placeholder console logs.

## Model Optimization
Use Blender export (glTF Binary) then run:
```bash
npm install -g gltf-pipeline
gltf-pipeline -i input.glb -o output-draco.glb --draco.compressionLevel=10 --quantize
```
Keep polycount modest (<50k for hero, <10k for thumbnails). Scale textures down (e.g. 2K → 1K) and use WebP where feasible.

## Fallback & Performance
- Checks `prefers-reduced-motion` & WebGL support.
- If unsupported, removes canvas and displays a static hero block + Lottie animation.
- Uses requestIdleCallback for secondary asset loads.
- Particle count reduced under data-saver conditions.
- Postprocessing moderate bloom to balance aesthetics/perf.

## Accessibility
- Semantic landmarks: header, main, sections, footer.
- Focus trap in modals (`utils.js` focusTrap).
- Keyboard navigation for nav menu + project cards (Enter opens modal).
- ARIA attributes on modal trigger buttons.

## SEO & Structured Data
JSON-LD Person schema injected inline in `<head>`.
Update `url`, `sameAs` array, and `email`.

## Debug / Inspect Mode
Press `I` or click Inspect button: overlay shows mode active. Append `?debug` to URL for FPS meter.

## Adding Analytics (Optional, Opt-In)
Example (Plausible):
```html
<!-- Add inside head only AFTER consent -->
<script defer data-domain="example.com" src="https://plausible.io/js/script.js"></script>
```

## Contact Form Integration
Netlify: add `netlify` attribute and `name="contact"` hidden input.
Formspree: set form `action="https://formspree.io/f/{id}"` method `POST`.

## Resume PDF
`Download CV` button uses jsPDF CDN fallback. Replace resume content inside `setupCVDownload()`.

## Particle Field & Skills Flow
Particle field implemented in `main.js`. Customize colors or physics adjustment there.

## Updating Lighting & Environment
Replace HDR file in `assets/hdr/`. If using real HDR, load via RGBELoader & PMREMGenerator for proper reflections.

## Security & Privacy
No tracking scripts by default. Keep dependencies updated: `npm outdated`.

## Build Output
`dist/` contains hashed assets for cache efficiency. Serve with compression (gzip/brotli). Ensure correct MIME for `.hdr`.

## License / Attribution
Replace assets that require attribution. Use Polyhaven (CC0) and your original models.

## Troubleshooting
- White screen: check browser console for failed GLB loads (likely path or compression issue).
- Low FPS: reduce bloom strength or devicePixelRatio cap in `three-scene.js`.
- Modal focus issues: verify `focusTrap` not removed.

## TODO (User After Setup)
1. Replace all placeholder assets.
2. Verify mobile fallback behavior.
3. Add more sections if needed (e.g., Blog).
4. Deploy & monitor with Lighthouse.

---
Happy building! 🚀
