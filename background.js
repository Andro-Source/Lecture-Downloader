function getCaptureKey(tabId) {
  return `captures:${tabId}`;
}

function clearTabCaptures(tabId) {
  chrome.storage.local.remove(getCaptureKey(tabId));
  chrome.action.setBadgeText({ text: "", tabId });
}

function buildPreviewLabel(sourceUrl, index) {
  const flavorMatch = sourceUrl.match(/\/flavorId\/([^/]+)/i);
  if (flavorMatch) {
    return `Flavor ${flavorMatch[1]}`;
  }

  const nameMatch = sourceUrl.match(/\/name\/([^/]+)/i);
  if (nameMatch) {
    return decodeURIComponent(nameMatch[1]);
  }

  return `Candidate ${index + 1}`;
}

function isAudioStream(sourceUrl) {
  return /\/audio\//i.test(sourceUrl) || /audio/i.test(sourceUrl);
}

chrome.tabs.onRemoved.addListener((tabId) => {
  clearTabCaptures(tabId);
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  clearTabCaptures(tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    clearTabCaptures(tabId);
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = details.url;
    if (url.includes("/scf/hls/")) {
      // 1. Change scf/hls to pd
      let pdUrl = url.replace("/scf/hls/", "/pd/");

      // 2. Remove the segment filename (everything after /name/something.mp4 or similar)
      // We want to stop right after the video extension or flavor ID
      pdUrl = pdUrl.split("/seg-")[0].split("/segment/")[0];

      // 3. Ensure it doesn't end in a trailing slash or .ts
      pdUrl = pdUrl.replace(/\.ts.*$/, "").replace(/\/$/, "");

      const captureKey = getCaptureKey(details.tabId);
      chrome.storage.local.get([captureKey], (result) => {
        const captures = Array.isArray(result[captureKey]) ? result[captureKey] : [];
        const exists = captures.some((item) => item.url === pdUrl);
        if (exists) {
          return;
        }

        const nextIndex = captures.length;
        captures.push({
          id: `${Date.now()}-${nextIndex}`,
          url: pdUrl,
          sourceUrl: url,
          label: buildPreviewLabel(url, nextIndex),
          mediaType: isAudioStream(url) ? "audio" : "video",
        });

        chrome.storage.local.set({ [captureKey]: captures });
        chrome.action.setBadgeText({ text: String(captures.length), tabId: details.tabId });
        chrome.action.setBadgeBackgroundColor({
          color: "#4CAF50",
          tabId: details.tabId,
        });
      });
    }
  },
  { urls: ["*://*.kaltura.com/*"] },
);
