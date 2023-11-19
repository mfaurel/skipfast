chrome.runtime.onInstalled.addListener(() => {
  // Add Netflix on Install
  chrome.storage.local.set({ netflix: true});
  chrome.storage.local.set({ netflixSkipIntro: true });
  chrome.storage.local.set({ netflixSkipRecap: true });
  chrome.storage.local.set({ netflixSkipNext: true });
  chrome.storage.local.set({ skipIntro: true, skipRecap: true, skipNext: true, skipAds: true });
});