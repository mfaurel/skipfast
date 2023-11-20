chrome.runtime.onInstalled.addListener(() => {
  // Add Netflix on Install
  chrome.storage.local.set({ netflix: true});
  chrome.storage.local.set({ netflixSkipIntro: true });
  chrome.storage.local.set({ netflixSkipRecap: true });
  chrome.storage.local.set({ netflixSkipNext: true });
  // Add AppleTV on Install
  chrome.storage.local.set({ apple: true});
  chrome.storage.local.set({ appleSkipAds: true });
  // Add Disney+ on Install
  // TODO
  // Add Prime Video on Install
  // TODO
});