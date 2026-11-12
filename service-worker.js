"use strict";

const CACHE_NAME = "block-and-bloom-v1";
const APP_SHELL_URL = new URL("./index.html", self.registration.scope).href;

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.add(APP_SHELL_URL))
      .then(() => self.skipWaiting())
      .catch(error => {
        console.error("The game could not be saved for offline play.", error);
        throw error;
      })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(names => Promise.all(
        names
          .filter(name => name.startsWith("block-and-bloom-") && name !== CACHE_NAME)
          .map(name => caches.delete(name))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const requestUrl = new URL(request.url);
  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
      const response = await fetch(request);
      if (response.ok) {
        try {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
        } catch (error) {
          console.error("This page could not be saved for offline play.", error);
        }
      }
      return response;
    } catch (error) {
      if (request.mode === "navigate") {
        const appShell = await caches.match(APP_SHELL_URL);
        if (appShell) return appShell;
      }
      throw error;
    }
  })());
});
