// Netflix
let netflixCheckbox = document.getElementById("netflixCheckbox");
let netflixSkipIntro = document.getElementById("netflix-skip-intro");
let netflixSkipRecap = document.getElementById("netflix-skip-recap");
let netflixSkipNext = document.getElementById("netflix-skip-next");

/*let skipRecapCheckbox = document.getElementById("skip-recap");
let skipNextCheckbox = document.getElementById("skip-next");
let skipAdsCheckbox = document.getElementById("skip-ads");
*/
/*netflixCheckbox.addEventListener("click", async () => {
  chrome.storage.local.set({ netflix: netflixCheckbox.checked });
  chrome.storage.local.set({ netflixSkipIntro: netflixSkipIntro.checked });
  chrome.storage.local.set({ netflixSkipRecap: netflixSkipRecap.checked });
  chrome.storage.local.set({ netflixSkipNext: netflixSkipNext.checked });
});
*/
/*
skipRecapCheckbox.addEventListener("click", async () => {
  chrome.storage.local.set({ skipRecap: skipRecapCheckbox.checked });
});

skipNextCheckbox.addEventListener("click", async () => {
  chrome.storage.local.set({ skipNext: skipNextCheckbox.checked });
});

skipAdsCheckbox.addEventListener("click", async () => {
  chrome.storage.local.set({ skipAds: skipAdsCheckbox.checked });
});
*/

chrome.storage.local.get(
  ["netflix", "netflixSkipIntro", "netflixSkipRecap", "netflixSkipNext", "primeVideo", "appleTV", "disneyPlus"],
  ({ netflix, primeVideo, appleTV, disneyPlus }) => {
    if (netflix = true) {
      netflixCheckbox.checked = true;
      document.getElementById('netflix-options-list').style.display = 'block';
    }
    if (netflixSkipIntro) {
      netflixSkipIntro.checked = true;
      netflixCheckbox.checked = true;
      document.getElementById('netflix-options-list').style.display = 'block';
    }
    if (netflixSkipRecap) {
      netflixSkipRecap.checked = true;
      netflixCheckbox.checked = true;
      document.getElementById('netflix-options-list').style.display = 'block';
    }
    if (netflixSkipNext) {
      netflixSkipNext.checked = true;
      netflixCheckbox.checked = true;
      document.getElementById('netflix-options-list').style.display = 'block';
    }   
    
    
    /*
    if (skipRecap) {
      skipRecapCheckbox.checked = true;
    }
    if (skipNext) {
      skipNextCheckbox.checked = true;
    }
    if (skipAds) {
      skipAdsCheckbox.checked = true;
    }*/
  }
);

// Close Netflix options list if clicking outside of Netflix
document.addEventListener('click', function(e) {
  // netflixCheckbox
  var netflixCheckbox = document.getElementById('netflixCheckbox');
  var netflixOptionsList = document.getElementById('netflix-options-list');
  // primeVideoCheckbox
  var primeVideoCheckbox = document.getElementById('prime');
  var primeVideoOptionsList = document.getElementById('primeVideo-options-list');


  if (e.target == netflixCheckbox && netflixCheckbox.checked) {
    // Netflix all
    netflixOptionsList.style.display = 'block';
    toggleNetflixCheckboxes();
  } else if (e.target == netflixCheckbox && !netflixCheckbox.checked) {
    // Netflix un-all
    netflixOptionsList.style.display = 'none';
    toggleNetflixCheckboxes();
    // TODO + enregistrer dans storage

    // NEtflix 1

    // Netflix 2

    // Netflix 3
  // Prime Video
  } else if (e.target == primeVideoCheckbox && !primeVideoCheckbox.checked) {
    primeVideoOptionsList.style.display = 'block';
    var netflixCheckboxes = document.querySelectorAll('[data-netflix]');
    netflixCheckboxes.forEach(function(checkbox) {
      checkbox.checked = netflixCheckbox.checked;
    });
    primeCheckboxes.forEach(function(checkbox) {
      checkbox.checked = primeVideoCheckbox.checked;
    });
    // + tout décocher
  }else if (e.target == primeVideoCheckbox && !primeVideoCheckbox.checked) {
    optionsList.style.display = 'none';
    // + tout décocher
  } 





  /*else if (e.target !== netflixCheckbox && !netflixCheckbox.contains(e.target) && e.target !== optionsList && !optionsList.contains(e.target)) {
    optionsList.style.display = 'none';
  }
*/
});

function toggleNetflixCheckboxes() {
  var netflixCheckboxes = document.querySelectorAll('[data-netflix]');
  netflixCheckboxes.forEach(function(checkbox) {
    checkbox.checked = netflixCheckbox.checked;
  });
  chrome.storage.local.set({ netflix: netflixCheckbox.checked });
  chrome.storage.local.set({ netflixSkipIntro: netflixCheckbox.checked });
  chrome.storage.local.set({ netflixSkipRecap: netflixCheckbox.checked });
  chrome.storage.local.set({ netflixSkipNext: netflixCheckbox.checked });
}

