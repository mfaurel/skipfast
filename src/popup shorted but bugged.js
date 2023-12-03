const netflixOptions = {
  checkbox: document.getElementById("netflixCheckbox"),
  optionsList: document.getElementById('netflix-options-list'),
  skipIntro: document.getElementById("netflix-skip-intro"),
  skipRecap: document.getElementById("netflix-skip-recap"),
  skipNext: document.getElementById("netflix-skip-next")
};

const appleOptions = {
  checkbox: document.getElementById("appleCheckbox"),
  optionsList: document.getElementById('apple-options-list'),
  skipAds: document.getElementById("apple-skip-ads")
};

const primeOptions = {
  checkbox: document.getElementById("primeCheckbox"),
  optionsList: document.getElementById("prime-options-list"),
  skipIntro: document.getElementById('prime-skip-intro'),
  skipRecap: document.getElementById("prime-skip-recap"),
  skipNext: document.getElementById('prime-skip-next'),
  skipAds: document.getElementById("prime-skip-ads")
};

const disneyOptions = {
  checkbox: document.getElementById("disneyCheckbox"),
  optionsList: document.getElementById('disney-options-list'),
  skipIntro: document.getElementById('disney-skip-intro'),
  skipNext: document.getElementById('disney-skip-next')
};

chrome.storage.local.get(
  [
    "netflix", "netflixSkipIntro", "netflixSkipRecap", "netflixSkipNext",
    "apple", "appleSkipAds",
    "prime", "primeSkipIntro", "primeSkipRecap", "primeSkipNext", "primeSkipAds",
    "disney", "disneySkipIntro", "disneySkipNext"
  ],
  ({ netflix, netflixSkipIntro, netflixSkipRecap, netflixSkipNext,
     apple, appleSkipAds,
     prime, primeSkipIntro, primeSkipRecap, primeSkipNext, primeSkipAds,
     disney, disneySkipIntro, disneySkipNext }) => {
    updateOptions(netflixOptions, netflix, netflixSkipIntro, netflixSkipRecap, netflixSkipNext);
    updateOptions(appleOptions, apple, appleSkipAds);
    updateOptions(primeOptions, prime, primeSkipIntro, primeSkipRecap, primeSkipNext, primeSkipAds);
    updateOptions(disneyOptions, disney, disneySkipIntro, disneySkipNext);
  }
);

document.addEventListener('click', function (e) {
  handleCheckboxClick(netflixOptions, e);
  handleOptionsClick(netflixOptions, e);

  handleCheckboxClick(appleOptions, e);
  handleOptionsClick(appleOptions, e);

  handleCheckboxClick(primeOptions, e);
  handleOptionsClick(primeOptions, e);

  handleCheckboxClick(disneyOptions, e);
  handleOptionsClick(disneyOptions, e);
});

function updateOptions(options, value, skipIntro, skipRecap, skipNext, skipAds) {
  if (value || skipIntro || skipRecap || skipNext || skipAds) {
    options.optionsList.style.display = 'block';
  } else {
    options.optionsList.style.display = 'none';
  }
  options.checkbox.checked = value;
  options.skipIntro.checked = skipIntro;
  options.skipRecap.checked = skipRecap;
  options.skipNext.checked = skipNext;
  if (options.skipAds) {
    options.skipAds.checked = skipAds;
  }
}

function handleCheckboxClick(options, e) {
  if (e.target === options.checkbox) {
    toggleCheckboxes(options);
  }
}

function handleOptionsClick(options, e) {
  if (e.target === options.skipIntro) {
    updateOption(`${options.name}SkipIntro`, options.skipIntro.checked);
  } else if (e.target === options.skipRecap) {
    updateOption(`${options.name}SkipRecap`, options.skipRecap.checked);
  } else if (e.target === options.skipNext) {
    updateOption(`${options.name}SkipNext`, options.skipNext.checked);
  } else if (e.target === options.skipAds) {
    updateOption(`${options.name}SkipAds`, options.skipAds.checked);
  }
  if (!options.skipIntro.checked && !options.skipRecap.checked && !options.skipNext.checked && !options.skipAds.checked) {
    options.checkbox.checked = false;
    updateOption(options.name, false);
    options.optionsList.style.display = 'none';
  }
}

function toggleCheckboxes(options) {
  const checkboxes = document.querySelectorAll(`[data-${options.name.toLowerCase()}]`);
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = options.checkbox.checked;
  });
  if (options.checkbox.checked == true) {
    options.optionsList.style.display = 'block';
  }
  updateOption(options.name, options.checkbox.checked);
  updateOption(`${options.name}SkipIntro`, options.checkbox.checked);
  updateOption(`${options.name}SkipRecap`, options.checkbox.checked);
  updateOption(`${options.name}SkipNext`, options.checkbox.checked);
  updateOption(`${options.name}SkipAds`, options.skipAds.checked);
}

function updateOption(optionName, value) {
  chrome.storage.local.set({ [optionName]: value });
}
