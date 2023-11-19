const netflixCheckbox = document.getElementById("netflixCheckbox");
const netflixOptionsList = document.getElementById('netflix-options-list');
const netflixSkipIntro = document.getElementById("netflix-skip-intro");
const netflixSkipRecap = document.getElementById("netflix-skip-recap");
const netflixSkipNext = document.getElementById("netflix-skip-next");

chrome.storage.local.get(
  ["netflix", "netflixSkipIntro", "netflixSkipRecap", "netflixSkipNext"],
  ({ netflix, netflixSkipIntro, netflixSkipRecap, netflixSkipNext }) => {
    updateNetflixOptions(netflix, netflixSkipIntro, netflixSkipRecap, netflixSkipNext);
  }
);

document.addEventListener('click', function(e) {
  handleNetflixCheckboxClick(e);
  handleNetflixOptionsClick(e);
});

function updateNetflixOptions(netflix, skipIntro, skipRecap, skipNext) {
  if (netflix || skipIntro || skipRecap || skipNext) {
    netflixOptionsList.style.display = 'block';
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

function updateOption(optionName, value) {
  chrome.storage.local.set({ [optionName]: value });
}
