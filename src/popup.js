let skipIntroCheckbox = document.getElementById("skip-intro");
let skipRecapCheckbox = document.getElementById("skip-recap");
let skipNextCheckbox = document.getElementById("skip-next");
let skipAdsCheckbox = document.getElementById("skip-ads");

skipIntroCheckbox.addEventListener("click", async () => {
  chrome.storage.local.set({ skipIntro: skipIntroCheckbox.checked });
});

skipRecapCheckbox.addEventListener("click", async () => {
  chrome.storage.local.set({ skipRecap: skipRecapCheckbox.checked });
});

skipNextCheckbox.addEventListener("click", async () => {
  chrome.storage.local.set({ skipNext: skipNextCheckbox.checked });
});

skipAdsCheckbox.addEventListener("click", async () => {
  chrome.storage.local.set({ skipAds: skipAdsCheckbox.checked });
});


chrome.storage.local.get(
  ["skipIntro", "skipRecap", "skipNext", "skipAds"],
  ({ skipIntro, skipRecap, skipNext, skipAds }) => {
    if (skipIntro) {
      skipIntroCheckbox.checked = true;
    }
    if (skipRecap) {
      skipRecapCheckbox.checked = true;
    }
    if (skipNext) {
      skipNextCheckbox.checked = true;
    }
    if (skipAds) {
      skipAdsCheckbox.checked = true;
    }
  }
);
