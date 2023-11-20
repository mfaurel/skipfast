// Netflix
const netflixCheckbox = document.getElementById("netflixCheckbox");
const netflixOptionsList = document.getElementById('netflix-options-list');
const netflixSkipIntro = document.getElementById("netflix-skip-intro");
const netflixSkipRecap = document.getElementById("netflix-skip-recap");
const netflixSkipNext = document.getElementById("netflix-skip-next");
// AppleTV
const appleCheckbox = document.getElementById("appleCheckbox");
const appleOptionsList = document.getElementById('apple-options-list');
const appleSkipAds = document.getElementById("apple-skip-ads");
// Prime Video
// TODO
// Disney+
// TODO

chrome.storage.local.get(
  ["netflix", "netflixSkipIntro", "netflixSkipRecap", "netflixSkipNext", "apple", "appleSkipAds"],
  ({ netflix, netflixSkipIntro, netflixSkipRecap, netflixSkipNext, apple, appleSkipAds }) => {
    updateNetflixOptions(netflix, netflixSkipIntro, netflixSkipRecap, netflixSkipNext);
    updateAppleTVOptions(apple, appleSkipAds);
  }
);

document.addEventListener('click', function(e) {
  // Netflix
  handleNetflixCheckboxClick(e);
  handleNetflixOptionsClick(e);
  // AppleTV
  handleAppleCheckboxClick(e);
  // Prime Video 
  // TODO
  // Disney+
  // TODO
});

//
// Netflix
//
function updateNetflixOptions(netflix, skipIntro, skipRecap, skipNext) {
  if (netflix || skipIntro || skipRecap || skipNext) {
    netflixOptionsList.style.display = 'block';
  } else {
    netflixOptionsList.style.display = 'none';
  }
  netflixCheckbox.checked = netflix;
  netflixSkipIntro.checked = skipIntro;
  netflixSkipRecap.checked = skipRecap;
  netflixSkipNext.checked = skipNext;
}

function handleNetflixCheckboxClick(e) {
  if (e.target === netflixCheckbox) {
    toggleNetflixCheckboxes();
  }
}

function handleNetflixOptionsClick(e) {
  if (e.target === netflixSkipIntro) {
    updateOption('netflixSkipIntro', netflixSkipIntro.checked);
  } else if (e.target === netflixSkipRecap) {
    updateOption('netflixSkipRecap', netflixSkipRecap.checked);
  } else if (e.target === netflixSkipNext) {
    updateOption('netflixSkipNext', netflixSkipNext.checked);
  }
  if(!netflixSkipIntro.checked && !netflixSkipRecap.checked && !netflixSkipNext.checked){
    netflixCheckbox.checked = netflixSkipIntro.checked;
    updateOption('netflix', netflixSkipIntro.checked);
    netflixOptionsList.style.display = 'none';
  }
}

function toggleNetflixCheckboxes() {
  const netflixCheckboxes = document.querySelectorAll('[data-netflix]');
  netflixCheckboxes.forEach(function(checkbox) {
    checkbox.checked = netflixCheckbox.checked;
  });
  if(netflixCheckbox.checked == true ){
    netflixOptionsList.style.display = 'block';
  }
  updateOption('netflix', netflixCheckbox.checked);
  updateOption('netflixSkipIntro', netflixCheckbox.checked);
  updateOption('netflixSkipRecap', netflixCheckbox.checked);
  updateOption('netflixSkipNext', netflixCheckbox.checked);
}

//
// AppleTV
//
function updateAppleTVOptions(apple, skipAds) {
  if (apple && skipAds) {
    appleOptionsList.style.display = 'block';
  } else {
    appleOptionsList.style.display = 'none';
  }
  appleCheckbox.checked = apple;
  appleSkipAds.checked = skipAds;
}

function handleAppleCheckboxClick(e) {
  if (e.target === appleCheckbox) {
    toggleAppleCheckboxes();
  }
  if (e.target === appleSkipAds) {
    updateOption('appleSkipAds', appleSkipAds.checked);
  }
  if(!appleCheckbox.checked || !appleSkipAds.checked){
    appleCheckbox.checked = false;
    appleSkipAds.checked = false;
    updateOption('apple', false);
    updateOption('appleSkipAds', false);
    appleOptionsList.style.display = 'none';
  }
}

function toggleAppleCheckboxes() {
  const appleCheckboxes = document.querySelectorAll('[data-apple]');
  appleCheckboxes.forEach(function(checkbox) {
    checkbox.checked = appleCheckbox.checked;
  });
  if(appleCheckbox.checked == true ){
    appleOptionsList.style.display = 'block';
  }
  updateOption('apple', appleCheckbox.checked);
  updateOption('appleSkipAds', appleSkipAds.checked);
}

//
// PrimeVideo
//
// TODO

//
// Disney+
//
// TODO

//
// Utils
//
function updateOption(optionName, value) {
  chrome.storage.local.set({ [optionName]: value });
}
