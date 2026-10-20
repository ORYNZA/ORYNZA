import fs from 'fs';
import path from 'path';

const dist = path.resolve('dist');

if (fs.existsSync(dist)) {
  const indexHtml = path.join(dist, 'index.html');
  if (fs.existsSync(indexHtml)) {
    // 1. Create dist/404.html for GitHub Pages SPA fallback
    fs.copyFileSync(indexHtml, path.join(dist, '404.html'));
    console.log('✓ Created dist/404.html for GitHub Pages SPA routing');

    // 2. Pre-generate static entries for known demo routes
    const routes = ['invite/demo-wedding', 'invite/example-couple'];
    for (const route of routes) {
      const routeDir = path.join(dist, route);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.copyFileSync(indexHtml, path.join(routeDir, 'index.html'));
      console.log(`✓ Pre-generated static route /${route}/index.html`);
    }
  }
}
