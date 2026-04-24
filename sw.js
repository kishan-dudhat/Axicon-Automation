/**
 * Axicon Automation — Service Worker
 * Intercepts navigation requests and redirects any 404 response to the home page.
 * Works on localhost / 127.0.0.1 (Live Server) and on production HTTPS.
 */

const SW_VERSION = 'axicon-sw-v1';

// Activate immediately — no waiting for old tabs to close
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.clients.claim());

self.addEventListener('fetch', (event) => {
  // Only intercept full-page navigation requests (not images, CSS, JS, etc.)
  if (event.request.mode !== 'navigate') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Redirect to home for any 404 / 4xx server response
        if (response.status === 404 || response.status === 403 || response.status === 410) {
          return Response.redirect('/', 302);
        }
        return response;
      })
      .catch(() => {
        // Network error (offline etc.) — also go home
        return Response.redirect('/', 302);
      })
  );
});
