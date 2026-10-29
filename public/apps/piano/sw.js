const VERSION = "piano-6e92f9c62f";
const FILES = ["./","assets/index-HIy-CpDy.js","assets/index-Dy1aHoCn.css","manifest.webmanifest","icon.svg","icon-192.png","icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(VERSION)
      .then((c) => c.addAll(FILES))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    // ページ本体はネットワーク優先(デプロイ後に新しい版が出るように)、圏外ならキャッシュ
    e.respondWith(fetch(req).catch(() => caches.match(self.registration.scope)));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
