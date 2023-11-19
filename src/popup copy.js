let netflixCheckbox = document.getElementById("netflixCheckbox");
/*let skipRecapCheckbox = document.getElementById("skip-recap");
let skipNextCheckbox = document.getElementById("skip-next");
let skipAdsCheckbox = document.getElementById("skip-ads");
*/
netflixCheckbox.addEventListener("click", async () => {
  chrome.storage.local.set({ netflix: netflixCheckbox.checked });
});


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
  ["skipIntro", "skipRecap", "skipNext", "skipAds"],
  ({ skipIntro, skipRecap, skipNext, skipAds }) => {
    if (skipIntro) {
      skipIntroCheckbox.checked = true;
    }/*
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
  var primeVideoOptionsList = document.querySelectorAll('[data-prime]');

  console.log("ok");

  // Netflix
  if (e.target == netflixCheckbox && netflixCheckbox.checked) {
    netflixOptionsList.style.display = 'block';
    var netflixCheckboxes = document.querySelectorAll('[data-netflix]');
    netflixCheckboxes.forEach(function(checkbox) {
      checkbox.checked = netflixCheckbox.checked;
    });
    // + enregistrer dans storage
  } else if (e.target == netflixCheckbox && !netflixCheckbox.checked) {
    optionsList.style.display = 'none';
    // + tout décocher
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





  else if (e.target !== netflixCheckbox && !netflixCheckbox.contains(e.target) && e.target !== optionsList && !optionsList.contains(e.target)) {
    optionsList.style.display = 'none';
  }

});