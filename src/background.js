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
  chrome.storage.local.set({ disney: true});
  chrome.storage.local.set({ disneySkipIntro: true });
  chrome.storage.local.set({ disneySkipNext: true });
  // Add Prime Video on Install
  chrome.storage.local.set({ prime: true});
  chrome.storage.local.set({ primeSkipIntro: true });
  chrome.storage.local.set({ primeSkipRecap: true });
  chrome.storage.local.set({ primeSkipNext: true });
  chrome.storage.local.set({ primeSkipAds: true });
});