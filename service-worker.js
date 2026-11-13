"use strict";

const CACHE_NAME = "block-and-bloom-v7";
const APP_SHELL_URL = new URL("./index.html", self.registration.scope).href;
const PRIVACY_URL = new URL("./privacy/index.html", self.registration.scope).href;
const LICENSE_URL = new URL("./LICENSE", self.registration.scope).href;
const PRIVACY_PATH = new URL("./privacy/", self.registration.scope).pathname;

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll([
        new Request(APP_SHELL_URL, { cache: "reload" }),
        new Request(PRIVACY_URL, { cache: "reload" }),
        new Request(LICENSE_URL, { cache: "reload" })
      ]))
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
      .then(() => self.clients.matchAll({ type: "window", includeUncontrolled: true }))
      .then(clients => Promise.all(
        clients
          .filter(client => client.url.startsWith(self.registration.scope))
          .map(client => client.navigate(client.url))
      ))
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const requestUrl = new URL(request.url);
  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) return;

  event.respondWith((async () => {
    if (request.mode === "navigate") {
      try {
        const response = await fetch(request, { cache: "no-cache" });
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
        const isPrivacyPage = requestUrl.pathname === PRIVACY_PATH.slice(0, -1) || requestUrl.pathname.startsWith(PRIVACY_PATH);
        const fallbackUrl = isPrivacyPage ? PRIVACY_URL : APP_SHELL_URL;
        const cached = await caches.match(request) || await caches.match(fallbackUrl);
        if (cached) return cached;
        throw error;
      }
    }

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
      throw error;
    }
  })());
});
