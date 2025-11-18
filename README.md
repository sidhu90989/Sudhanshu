# Sudhanshu Suryawanshi – 3D Portfolio (Single Page)

Modern, dark, neon-accent portfolio featuring interactive Three.js hero scene, 3D project cards, particle field, smooth GSAP animations, and accessible progressive fallbacks.

## Quick Start
```bash
npm install
npm run dev
# build optimized production
npm run build
# preview production build locally
npm run preview
```

## Deployment
- **Vercel**: `vercel --prod`
- **Netlify**: Drag `dist/` or use CLI `netlify deploy --prod --dir dist`
- **GitHub Pages**: Set repository, run `npm run build` then push `dist/` to `gh-pages` branch (or use gh-pages package).

## Technologies
- Three.js (scene, models, postprocessing)
- GSAP (timelines, reveals)
- Vite (bundling, asset hashing)
- Lottie (fallback animation)

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
