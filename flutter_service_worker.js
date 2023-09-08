'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "3214c66ac646da670117e153b61c47fe",
"index.html": "5e3fe586c4ff4a9ba9806523bb90c2c5",
"/": "5e3fe586c4ff4a9ba9806523bb90c2c5",
"main.dart.js": "8f81c467b102f4251bb48613af2bcc51",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"script.js": "8c15cc5657c184673f6b92aef1143de4",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "0fec5b712b0b7168f8017cd6483b1f43",
"assets/AssetManifest.json": "eecabd998bd0a13e523ee939a35ba056",
"assets/NOTICES": "4c46a515720fe889841fbd7829365923",
"assets/FontManifest.json": "14d56ce91bec63fecac6ac3fd9c59e4c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/youtube_player_flutter/assets/speedometer.webp": "50448630e948b5b3998ae5a5d112622b",
"assets/packages/mystiq_uikit/assets/logo.png": "a772b50cde5a6b6004b018b114c29330",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.css": "5a8d0222407e388155d7d1395a75d5b9",
"assets/packages/flutter_inappwebview/assets/t_rex_runner/t-rex.html": "16911fcc170c8af1c5457940bd0bf055",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-Bold.otf": "fdd0a9aac316b6a76b80b657db7a5102",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-ExtraboldIt.otf": "93d31a8b64e0fce747fcfac387e5a4ce",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-ThinIt.otf": "f9727529a25f4d67126669eacd4a5ddf",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA.otf": "4d7b24040235595353957d2ff96bb11b",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-BoldIt.otf": "9fdc5e9ebd93b5ae67d12a7454be7aee",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-Medium.otf": "27b12fce808d16ab1a36dbd968a8367e",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-SemiboldIt.otf": "1c64c649416871b7be3f00f4930a3617",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-Thin.otf": "9cd5e1def57e61b11a435fb577e6a625",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-MediumIt.otf": "61a615ada10dd7ff72211cdca647d82a",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-Black.otf": "30b4c2baa8a48b45fcf275bd2c200105",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-Light.otf": "aa5a5f3ef2a490edce4501c8a09660dd",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-Extrabold.otf": "e426f44594349f2c8a5957391eb3150c",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-BlackIt.otf": "556efda872762c13a509882244516068",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-LightIt.otf": "f805f0c3a726b8950d765c39bc6ef61a",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-It.otf": "c20971bc78f22046a72ae71321d59d07",
"assets/packages/mystiq_design_system/fonts/ProximaNovaA-Semibold.otf": "0a9a6415f38cb15504e83a69e72d7bd8",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.bin": "320fec596ef0f960d666dd8ee63ed21e",
"assets/fonts/MaterialIcons-Regular.otf": "c9bf4ebd9e858fafc21f0e8f6f383490",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
