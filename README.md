# HVAC Expert — Static landing page

Production-ready, dependency-free, responsive website for GitHub Pages. English-language copy.

## Files
- `index.html` — all website content, SEO metadata, accessible semantic markup
- `assets/styles.css` — responsive design, no external fonts or CDNs
- `assets/app.js` — accessible mobile menu, current year
- `assets/favicon.svg` — site icon
- `.nojekyll` — avoids GitHub Pages/Jekyll processing

## Publish on GitHub Pages
1. Create a new public repository on GitHub (e.g., `hvac-expert-site`).
2. Upload the **contents** of this folder to the repository root (including `index.html` and `.nojekyll`).
3. In repository **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
4. Your site will appear at `https://YOUR-USERNAME.github.io/hvac-expert-site/`.
5. To connect `hvac-expert.me`, open **Settings → Pages → Custom domain** and enter `hvac-expert.me`. Add the DNS records GitHub currently recommends for apex domains through your domain registrar. Enable **Enforce HTTPS** once DNS/SSL is ready.
6. If using custom domain, create `CNAME` file in repository root with `hvac-expert.me` on one line, if GitHub has not created it automatically.

## Edit content
- Search `index.html` for `Sveti Stefan`, `German Makarevich`, `makgerman@gmail.com` to edit corresponding sections.
- Replace conceptual artwork with approved real project photos if you have usage rights. Update descriptive text accordingly.
- Contact actions are `mailto:` and `tel:`. **No server-side form or backend required**.

## Evidence and attribution
Project descriptions are based on the supplied engineering CV and explicit project details provided by the site owner. International and earlier Russian assignments are identified as previous professional experience. The site does not imply that HVAC Expert was the contracting company for those assignments. All decorative project visuals are conceptual and are not photographs of actual works. Brand mentions indicate equipment serviced or historical training; no manufacturer partnership is implied.
