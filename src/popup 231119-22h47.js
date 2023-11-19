// Netflix
let netflixCheckbox = document.getElementById("netflixCheckbox");
let netflixSkipIntro = document.getElementById("netflix-skip-intro");
let netflixSkipRecap = document.getElementById("netflix-skip-recap");
let netflixSkipNext = document.getElementById("netflix-skip-next");

chrome.storage.local.get(
  ["netflix", "netflixSkipIntro", "netflixSkipRecap", "netflixSkipNext"/*, "primeVideo", "appleTV", "disneyPlus"*/],
  ({ netflix, netflixSkipIntro, netflixSkipRecap, netflixSkipNext/*, primeVideo, appleTV, disneyPlus*/ }) => {
    if (netflix) {
      document.getElementById('netflix-options-list').style.display = 'block';
      netflixCheckbox.checked = true;
      
    }
    if (netflixSkipIntro) {
      document.getElementById('netflix-options-list').style.display = 'block';
      netflixSkipIntro.checked = true;
      netflixCheckbox.checked = true;
      
    }
    if (netflixSkipRecap) {
      document.getElementById('netflix-options-list').style.display = 'block';
      netflixSkipRecap.checked = true;
      netflixCheckbox.checked = true;
      
    }
    if (netflixSkipNext) {
      document.getElementById('netflix-options-list').style.display = 'block';
      netflixSkipNext.checked = true;
      netflixCheckbox.checked = true;
     
    }   
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

  // Faire un case check / uncheck
  // Puis la liste des outils

  if (e.target == netflixCheckbox && netflixCheckbox.checked) {
    // Netflix all
    toggleNetflixCheckboxes();
    netflixOptionsList.style.display = 'block';
  } else if (e.target == netflixCheckbox && !netflixCheckbox.checked) {
    // Netflix un-all
    toggleNetflixCheckboxes();
    netflixOptionsList.style.display = 'none';

  } else if (e.target == netflixSkipIntro && netflixSkipIntro.checked) {
    // NetflixSkipIntro add
    netflixOptionsList.style.display = 'block';
    netflixSkipIntro.checked = true;
    netflixCheckbox.checked = true;
    chrome.storage.local.set({ netflix: netflixCheckbox.checked });
    chrome.storage.local.set({ netflixSkipIntro: netflixSkipIntro.checked });
  } else if (e.target == netflixSkipIntro && !netflixSkipIntro.checked) {
    // NetflixSkipIntro remove
    netflixOptionsList.style.display = 'block';
    netflixSkipIntro.checked = false;
    chrome.storage.local.set({ netflixSkipIntro: netflixSkipIntro.checked });
    // If all uncheck, netflix uncheckec

  } else if (e.target == netflixSkipRecap && netflixSkipRecap.checked) {
    // netflixSkipRecap add
    netflixOptionsList.style.display = 'block';
    netflixSkipRecap.checked = true;
    netflixCheckbox.checked = true;
    chrome.storage.local.set({ netflix: netflixCheckbox.checked });
    chrome.storage.local.set({ netflixSkipRecap: true });
  } else if (e.target == netflixSkipRecap && !netflixSkipRecap.checked) {
    // NetflixSkipIntro remove
    netflixOptionsList.style.display = 'block';
    netflixSkipRecap.checked = false;
    chrome.storage.local.set({ netflixSkipRecap: netflixSkipRecap.checked });
    // If all uncheck, netflix uncheckec
  }

  else if (e.target == netflixSkipNext && netflixSkipNext.checked) {
    // netflixSkipNext add
    netflixOptionsList.style.display = 'block';
    netflixSkipNext.checked = true;
    netflixCheckbox.checked = true;
    chrome.storage.local.set({ netflix: netflixCheckbox.checked });
    chrome.storage.local.set({ netflixSkipNext: netflixSkipNext.checked });
  } else if (e.target == netflixSkipNext && !netflixSkipNext.checked) {
    // NetflixSkipIntro remove
    netflixOptionsList.style.display = 'block';
    netflixSkipNext.checked = false;
    chrome.storage.local.set({ netflixSkipNext: netfnetflixSkipNextlixSkipRecap.checked });
    // If all uncheck, netflix uncheckec
  }



    // NEtflix 1

    // Netflix 2

    // Netflix 3
  // Prime Video
  /*else if (e.target == primeVideoCheckbox && !primeVideoCheckbox.checked) {
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
    optionsList.style.display = 'hidden';
    // + tout décocher
  } */
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

/*function untoggleNetflixCheckboxes() {
  var netflixCheckboxes = document.querySelectorAll('[data-netflix]');
  netflixCheckboxes.forEach(function(checkbox) {
    checkbox.checked = false;
  });
  chrome.storage.local.set({ netflix: undefined });
  chrome.storage.local.set({ netflixSkipIntro: undefined });
  chrome.storage.local.set({ netflixSkipRecap: undefined });
  chrome.storage.local.set({ netflixSkipNext: undefined });
}*/
