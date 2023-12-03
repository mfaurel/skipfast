const NETFLIX_SKIP_INTRO_DATA_UIA = "player-skip-intro"; // [aria-label='Skip Intro']
const NETFLIX_RECAP_DATA_UIA = "player-skip-recap"; // [aria-label='Skip Recap']
const NETFLIX_NEXT_DATA_UIA = "next-episode-seamless-button";
const NETFLIX_NEXT_DRAIN_DATA_UIA = "next-episode-seamless-button-draining";
// TODO : `[aria-label='Continue Playing']` ?

const APPLETV_INTRO_CLASSLIST = "skip__button";

const DISNEY_INTRO_CLASSLIST = "skip__button";
const DISNEY_NEXT_EPISODE_DATA_TESTID = "up-next-play-button";
// TODO : 'Playing next episode' selector: 'button.sc-gipzik.play'
// TODO : Skip recap ?

const PRIME_SKIP_INTRO_CLASSLIST = "f1oordr3"; 
const PRIME_SKIP_RECAP_CLASSLIST = "atvwebplayersdk-skipelement-button";
const PRIME_SKIP_ADS_DIV_AS_A_BUTTON = "fu4rd6c";
const PRIME_SKIP_NEXT_DIV_AS_A_BUTTON = "atvwebplayersdk-nextupcard-button"; 

const BUTTONS_DATA_UIA = [NETFLIX_SKIP_INTRO_DATA_UIA, NETFLIX_RECAP_DATA_UIA, NETFLIX_NEXT_DATA_UIA, NETFLIX_NEXT_DRAIN_DATA_UIA];
const BUTTONS_DATA_TESTID = [DISNEY_NEXT_EPISODE_DATA_TESTID];
const BUTTONS_CLASSLIST = [APPLETV_INTRO_CLASSLIST, DISNEY_INTRO_CLASSLIST, PRIME_SKIP_RECAP_CLASSLIST, PRIME_SKIP_INTRO_CLASSLIST];
const DIV_AS_A_BUTTON = [PRIME_SKIP_NEXT_DIV_AS_A_BUTTON, PRIME_SKIP_ADS_DIV_AS_A_BUTTON];

async function skipper() {
  let netflixSkipIntro, netflixSkipRecap, netflixSkipNext;
  let appleSkipAds;
  let disneySkipIntro, disneySkipNext;
  let primeSkipIntro, primeSkipRecap, primeSkipNext, primeSkipAds;
  let button_data_uia, button_data_testid, button_classlist;

  try {
    let result = await chrome.storage.local.get(["netflixSkipIntro", "netflixSkipRecap", "netflixSkipNext", "appleSkipAds", "disneySkipIntro", 
     "disneySkipNext", "primeSkipIntro", "primeSkipRecap", "primeSkipNext", "primeSkipAds"]);
      netflixSkipIntro = result.netflixSkipIntro;
      netflixSkipRecap = result.netflixSkipRecap;
      netflixSkipNext  = result.netflixSkipNext;
      appleSkipAds     = result.appleSkipAds;
      disneySkipIntro  = result.disneySkipIntro;
      disneySkipNext   = result.disneySkipNext;
      primeSkipIntro   = result.primeSkipIntro;
      primeSkipRecap   = result.primeSkipRecap;
      primeSkipNext    = result.primeSkipNext;
      primeSkipAds     = result.primeSkipAds;

    const mapper = {
          // Netflix
          [NETFLIX_SKIP_INTRO_DATA_UIA]: netflixSkipIntro,
          [NETFLIX_RECAP_DATA_UIA]: netflixSkipRecap,
          [NETFLIX_NEXT_DATA_UIA]: netflixSkipNext,
          [NETFLIX_NEXT_DRAIN_DATA_UIA]: netflixSkipNext,
          // Prime Video
          [PRIME_SKIP_INTRO_CLASSLIST]: primeSkipIntro,
          [PRIME_SKIP_RECAP_CLASSLIST]: primeSkipRecap,
          [PRIME_SKIP_NEXT_DIV_AS_A_BUTTON]: primeSkipNext,
          [PRIME_SKIP_ADS_DIV_AS_A_BUTTON]: primeSkipAds,
          // Disney+
          [DISNEY_INTRO_CLASSLIST]: disneySkipIntro,
          [DISNEY_NEXT_EPISODE_DATA_TESTID]: disneySkipNext,
          // AppleTV
          [APPLETV_INTRO_CLASSLIST]: appleSkipAds
    };

    BUTTONS_DATA_UIA.forEach((datauia) => {
      button_data_uia = Object.values(
        document.getElementsByTagName("button")
      ).find((elem) => elem.getAttribute("data-uia") === datauia);
      if (button_data_uia && mapper[datauia]) {
        button_data_uia.click();
      }
    });
    BUTTONS_DATA_TESTID.forEach((datatestid) => {
      button_data_testid = Object.values(
        document.getElementsByTagName("button")
      ).find((elem) => elem.getAttribute("data-testid") === datatestid);
      if (button_data_testid && mapper[datatestid]) {
        button_data_testid.click();
      }
    });
    BUTTONS_CLASSLIST.forEach((classList) => {
      button_classlist = Object.values(
        document.getElementsByTagName("button")
      ).find((elem) => elem.classList.contains(classList));
      if (button_classlist && mapper[classList]) {
        button_classlist.click();
      }
    });
    DIV_AS_A_BUTTON.forEach((classList) => {
      div_as_a_button_classlist = Object.values(
        document.getElementsByTagName("div")
      ).find((elem) => elem.classList.contains(classList));
      if (div_as_a_button_classlist && mapper[classList]) {
        div_as_a_button_classlist.click();
      }
    });

  } catch (err) {
    console.error(err);
  }
}

if (document.location.host.includes(".netflix.") || document.location.host.includes(".primevideo.") || document.location.host.includes(".disneyplus.") || document.location.host.includes("tv.apple.")) {
  setInterval(() => skipper(), 800);
}
