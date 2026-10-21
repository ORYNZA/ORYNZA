import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function serveRootFavicon() {
  return {
    name: 'serve-root-favicon',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rootFavicons = [
          '/favicon.ico',
          '/favicon.png',
          '/favicon-32.png',
          '/favicon-16.png',
          '/apple-touch-icon.png',
          '/site.webmanifest'
        ];
        const cleanUrl = req.url ? req.url.split('?')[0] : '';
        if (rootFavicons.includes(cleanUrl)) {
          const filePath = path.resolve('public', cleanUrl.slice(1));
          if (fs.existsSync(filePath)) {
            const ext = path.extname(filePath);
            const mimeTypes = {
              '.ico': 'image/x-icon',
              '.png': 'image/png',
              '.webmanifest': 'application/manifest+json'
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            res.setHeader('Cache-Control', 'no-cache');
            return fs.createReadStream(filePath).pipe(res);
          }
        }
        next();
      });
    }
  };
}

export default defineConfig({
  base: '/ORYNZA/',
  plugins: [react(), serveRootFavicon()],
  build: { sourcemap: false, chunkSizeWarningLimit: 600 },
});
