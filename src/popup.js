// Global Settings
const autoFullscreen = document.getElementById("autoFullscreen");
const volumeScroll = document.getElementById("volumeScroll");
const speedControl = document.getElementById("speedControl");
const defaultSpeed = document.getElementById("defaultSpeed");

// Netflix
const netflixCheckbox = document.getElementById("netflixCheckbox");
const netflixOptionsList = document.getElementById('netflix-options-list');
const netflixSkipIntro = document.getElementById("netflix-skip-intro");
const netflixSkipRecap = document.getElementById("netflix-skip-recap");
const netflixSkipNext = document.getElementById("netflix-skip-next");
const netflixRememberProfile = document.getElementById("netflix-remember-profile");
const netflixBlockWatching = document.getElementById("netflix-block-watching");

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
const primeRemoveBlur = document.getElementById("prime-remove-blur");

// Disney+
const disneyCheckbox = document.getElementById("disneyCheckbox");
const disneyOptionsList = document.getElementById('disney-options-list');
const disneySkipIntro = document.getElementById('disney-skip-intro');
const disneySkipNext = document.getElementById('disney-skip-next');

// Load all settings
chrome.storage.local.get([
  // Global settings
  "autoFullscreen", "volumeScroll", "speedControl", "defaultSpeed",
  // Netflix settings
  "netflix", "netflixSkipIntro", "netflixSkipRecap", "netflixSkipNext",
  "netflixRememberProfile", "netflixBlockWatching",
  // Apple settings
  "apple", "appleSkipAds",
  // Prime settings
  "prime", "primeSkipIntro", "primeSkipRecap", "primeSkipNext", 
  "primeSkipAds", "primeRemoveBlur",
  // Disney settings
  "disney", "disneySkipIntro", "disneySkipNext"
], (result) => {
  // Update global settings
  updateGlobalSettings(
    result.autoFullscreen,
    result.volumeScroll,
    result.speedControl,
    result.defaultSpeed
  );

  // Update Netflix options
  updateNetflixOptions(
    result.netflix,
    result.netflixSkipIntro,
    result.netflixSkipRecap,
    result.netflixSkipNext,
    result.netflixRememberProfile,
    result.netflixBlockWatching
  );

  // Update AppleTV options
  updateAppleTVOptions(result.apple, result.appleSkipAds);

  // Update Prime options
  updatePrimeOptions(
    result.prime,
    result.primeSkipIntro,
    result.primeSkipRecap,
    result.primeSkipNext,
    result.primeSkipAds,
    result.primeRemoveBlur
  );

  // Update Disney options
  updateDisneyOptions(
    result.disney,
    result.disneySkipIntro,
    result.disneySkipNext
  );
});

// Event listeners
document.addEventListener('click', function(e) {
  // Global settings
  handleGlobalSettingsClick(e);

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

// Handle speed select change
defaultSpeed.addEventListener('change', function() {
  updateOption('defaultSpeed', parseFloat(defaultSpeed.value));
});

//
// Global Settings
//
function updateGlobalSettings(autoFullscreenValue, volumeScrollValue, speedControlValue, defaultSpeedValue) {
  autoFullscreen.checked = autoFullscreenValue;
  volumeScroll.checked = volumeScrollValue;
  speedControl.checked = speedControlValue;
  defaultSpeed.value = defaultSpeedValue || "1.0";
}

function handleGlobalSettingsClick(e) {
  if (e.target === autoFullscreen) {
    updateOption('autoFullscreen', autoFullscreen.checked);
  } else if (e.target === volumeScroll) {
    updateOption('volumeScroll', volumeScroll.checked);
  } else if (e.target === speedControl) {
    updateOption('speedControl', speedControl.checked);
  }
}

//
// Netflix
//
function updateNetflixOptions(netflix, skipIntro, skipRecap, skipNext, rememberProfile, blockWatching) {
  if (netflix || skipIntro || skipRecap || skipNext || rememberProfile || blockWatching) {
    netflixOptionsList.style.display = 'block';
  } else {
    netflixOptionsList.style.display = 'none';
  }
  netflixCheckbox.checked = netflix;
  netflixSkipIntro.checked = skipIntro;
  netflixSkipRecap.checked = skipRecap;
  netflixSkipNext.checked = skipNext;
  netflixRememberProfile.checked = rememberProfile;
  netflixBlockWatching.checked = blockWatching;
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
  } else if (e.target === netflixRememberProfile) {
    updateOption('netflixRememberProfile', netflixRememberProfile.checked);
  } else if (e.target === netflixBlockWatching) {
    updateOption('netflixBlockWatching', netflixBlockWatching.checked);
  }

  if (!netflixSkipIntro.checked && !netflixSkipRecap.checked && 
      !netflixSkipNext.checked && !netflixRememberProfile.checked && 
      !netflixBlockWatching.checked) {
    netflixCheckbox.checked = false;
    updateOption('netflix', false);
    netflixOptionsList.style.display = 'none';
  }
}

function toggleNetflixCheckboxes() {
  const netflixCheckboxes = document.querySelectorAll('[data-netflix]');
  netflixCheckboxes.forEach(function(checkbox) {
    checkbox.checked = netflixCheckbox.checked;
  });
  if (netflixCheckbox.checked) {
    netflixOptionsList.style.display = 'block';
  }
  updateOption('netflix', netflixCheckbox.checked);
  updateOption('netflixSkipIntro', netflixCheckbox.checked);
  updateOption('netflixSkipRecap', netflixCheckbox.checked);
  updateOption('netflixSkipNext', netflixCheckbox.checked);
  updateOption('netflixRememberProfile', netflixCheckbox.checked);
  updateOption('netflixBlockWatching', netflixCheckbox.checked);
}

//
// AppleTV
//
function updateAppleTVOptions(apple, skipAds) {
  if (apple || skipAds) {
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
  } else if (e.target === appleSkipAds) {
    updateOption('appleSkipAds', appleSkipAds.checked);
    if (!appleSkipAds.checked) {
      appleCheckbox.checked = false;
      updateOption('apple', false);
      appleOptionsList.style.display = 'none';
    }
  }
}

function toggleAppleCheckboxes() {
  const appleCheckboxes = document.querySelectorAll('[data-apple]');
  appleCheckboxes.forEach(function(checkbox) {
    checkbox.checked = appleCheckbox.checked;
  });
  if (appleCheckbox.checked) {
    appleOptionsList.style.display = 'block';
  }
  updateOption('apple', appleCheckbox.checked);
  updateOption('appleSkipAds', appleCheckbox.checked);
}

//
// PrimeVideo
//
function updatePrimeOptions(prime, skipIntro, skipRecap, skipNext, skipAds, removeBlur) {
  if (prime || skipIntro || skipRecap || skipNext || skipAds || removeBlur) {
    primeOptionsList.style.display = 'block';
  } else {
    primeOptionsList.style.display = 'none';
  }
  primeCheckbox.checked = prime;
  primeSkipIntro.checked = skipIntro;
  primeSkipRecap.checked = skipRecap;
  primeSkipNext.checked = skipNext;
  primeSkipAds.checked = skipAds;
  primeRemoveBlur.checked = removeBlur;
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
  } else if (e.target === primeSkipAds) {
    updateOption('primeSkipAds', primeSkipAds.checked);
  } else if (e.target === primeRemoveBlur) {
    updateOption('primeRemoveBlur', primeRemoveBlur.checked);
  }

  if (!primeSkipIntro.checked && !primeSkipRecap.checked && 
      !primeSkipNext.checked && !primeSkipAds.checked && 
      !primeRemoveBlur.checked) {
    primeCheckbox.checked = false;
    updateOption('prime', false);
    primeOptionsList.style.display = 'none';
  }
}

function togglePrimeCheckboxes() {
  const primeCheckboxes = document.querySelectorAll('[data-prime]');
  primeCheckboxes.forEach(function(checkbox) {
    checkbox.checked = primeCheckbox.checked;
  });
  if (primeCheckbox.checked) {
    primeOptionsList.style.display = 'block';
  }
  updateOption('prime', primeCheckbox.checked);
  updateOption('primeSkipIntro', primeCheckbox.checked);
  updateOption('primeSkipRecap', primeCheckbox.checked);
  updateOption('primeSkipNext', primeCheckbox.checked);
  updateOption('primeSkipAds', primeCheckbox.checked);
  updateOption('primeRemoveBlur', primeCheckbox.checked);
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
  if (!disneySkipIntro.checked && !disneySkipNext.checked) {
    disneyCheckbox.checked = false;
    updateOption('disney', false);
    disneyOptionsList.style.display = 'none';
  }
}

function toggleDisneyCheckboxes() {
  const disneyCheckboxes = document.querySelectorAll('[data-disney]');
  disneyCheckboxes.forEach(function(checkbox) {
    checkbox.checked = disneyCheckbox.checked;
  });
  if (disneyCheckbox.checked) {
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
