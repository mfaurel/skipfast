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
const primeCheckbox = document.getElementById("primeCheckbox");
const primeOptionsList= document.getElementById("prime-options-list");
const primeSkipIntro = document.getElementById('prime-skip-intro');
const primeSkipRecap = document.getElementById("prime-skip-recap");
const primeSkipNext = document.getElementById('prime-skip-next');
const primeSkipAds = document.getElementById("prime-skip-ads");
// Disney+
const disneyCheckbox = document.getElementById("disneyCheckbox");
const disneyOptionsList = document.getElementById('disney-options-list');
const disneySkipIntro = document.getElementById('disney-skip-intro');
const disneySkipNext = document.getElementById('disney-skip-next');

chrome.storage.local.get(
  ["netflix", "netflixSkipIntro", "netflixSkipRecap", "netflixSkipNext", "apple", "appleSkipAds", "prime", "primeSkipIntro", "primeSkipRecap", "primeSkipNext", 
"primeSkipAds", "disney", "disneySkipIntro", "disneySkipNext"],
  ({ netflix, netflixSkipIntro, netflixSkipRecap, netflixSkipNext, apple, appleSkipAds, prime, primeSkipIntro, primeSkipRecap, primeSkipNext, primeSkipAds,
    disney, disneySkipIntro, disneySkipNext}) => {
    updateNetflixOptions(netflix, netflixSkipIntro, netflixSkipRecap, netflixSkipNext);
    updateAppleTVOptions(apple, appleSkipAds);
    updatePrimeOptions(prime, primeSkipIntro, primeSkipRecap, primeSkipNext, primeSkipAds);
    updateDisneyOptions(disney, disneySkipIntro, disneySkipNext);
  }
);

document.addEventListener('click', function(e) {
  // Netflix
  handleNetflixCheckboxClick(e);
  handleNetflixOptionsClick(e);
  // AppleTV
  handleAppleCheckboxClick(e);
  // Prime Video 
  handlePrimeCheckboxClick(e);
  handlePrimeOptionsClick(e);
  // Disney+
  handleDisneyCheckboxClick(e);
  handleDisneyOptionsClick(e);
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
function updatePrimeOptions(prime, skipIntro, skipRecap, skipNext, skipAds) {
  if (prime || skipIntro || skipRecap || skipNext || skipAds) {
    primeOptionsList.style.display = 'block';
  } else {
    primeOptionsList.style.display = 'none';
  }
  primeCheckbox.checked = prime;
  primeSkipIntro.checked = skipIntro;
  primeSkipRecap.checked = skipRecap;
  primeSkipNext.checked = skipNext;
  primeSkipAds.checked = skipAds;
}

function handlePrimeCheckboxClick(e) {
  if (e.target === primeCheckbox) {
    togglePrimeCheckboxes();
  }
}

function handlePrimeOptionsClick(e) {
  if (e.target === primeSkipIntro) {
    updateOption('primeSkipIntro', primeSkipIntro.checked);
  } else if (e.target === primeSkipRecap) {
    updateOption('primeSkipRecap', primeSkipRecap.checked);
  } else if (e.target === primeSkipNext) {
    updateOption('primeSkipNext', primeSkipNext.checked);
  }else if (e.target === primeSkipAds) {
    updateOption('primeSkipAds', primeSkipAds.checked);
  }
  if(!primeSkipIntro.checked && !primeSkipRecap.checked && !primeSkipNext.checked && !primeSkipAds.checked){
    primeCheckbox.checked = primeSkipIntro.checked;
    updateOption('prime', primeSkipIntro.checked);
    primeOptionsList.style.display = 'none';
  }
}

function togglePrimeCheckboxes() {
  const primeCheckboxes = document.querySelectorAll('[data-prime]');
  primeCheckboxes.forEach(function(checkbox) {
    checkbox.checked = primeCheckbox.checked;
  });
  if(primeCheckbox.checked == true ){
    primeOptionsList.style.display = 'block';
  }
  updateOption('prime', primeCheckbox.checked);
  updateOption('primeSkipIntro', primeCheckbox.checked);
  updateOption('primeSkipRecap', primeCheckbox.checked);
  updateOption('primeSkipNext', primeCheckbox.checked);
  updateOption('primeSkipAds', primeSkipAds.checked);
}

//
// Disney+
//
function updateDisneyOptions(disney, skipIntro, skipNext) {
  if (disney || skipIntro || skipNext) {
    disneyOptionsList.style.display = 'block';
  } else {
    disneyOptionsList.style.display = 'none';
  }
  disneyCheckbox.checked = disney;
  disneySkipIntro.checked = skipIntro;
  disneySkipNext.checked = skipNext;
}

function handleDisneyCheckboxClick(e) {
  if (e.target === disneyCheckbox) {
    toggleDisneyCheckboxes();
  }
}

function handleDisneyOptionsClick(e) {
  if (e.target === disneySkipIntro) {
    updateOption('disneySkipIntro', disneySkipIntro.checked);
  } else if (e.target === disneySkipNext) {
    updateOption('disneySkipNext', disneySkipNext.checked);
  }
  if(!disneySkipIntro.checked && !disneySkipNext.checked){
    disneyCheckbox.checked = disneySkipIntro.checked;
    updateOption('disney', disneySkipIntro.checked);
    disneyOptionsList.style.display = 'none';
  }
}

function toggleDisneyCheckboxes() {
  const disneyCheckboxes = document.querySelectorAll('[data-disney]');
  disneyCheckboxes.forEach(function(checkbox) {
    checkbox.checked = disneyCheckbox.checked;
  });
  if(disneyCheckbox.checked == true ){
    disneyOptionsList.style.display = 'block';
  }
  updateOption('disney', disneyCheckbox.checked);
  updateOption('disneySkipIntro', disneyCheckbox.checked);
  updateOption('disneySkipNext', disneyCheckbox.checked);
}

//
// Utils
//
function updateOption(optionName, value) {
  chrome.storage.local.set({ [optionName]: value });
}
