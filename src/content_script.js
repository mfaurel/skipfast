// OK
const NETFLIX_SKIP_INTRO_DATA_UIA = "player-skip-intro"; 


const NETFLIX_RECAP_UIA = "player-skip-recap";
const NETFLIX_NEXT_UIA = "next-episode-seamless-button";
const NETFLIX_NEXT_DRAIN_UIA = "next-episode-seamless-button-draining";
const NETFLIX_INTRO_SKIP_CLASS = "ltr-bf8b0m"

const DISNEY_NEXT_EPISODE_TEST_ID = "up-next-play-button";
const DISNEY_INTRO_CLASS = "skip__button";

const PRIME_RECAP = "skipElement";
const PRIME_RECAP_2 = "atvwebplayersdk-skipelement-button";
const PRIME_RECAP_3 = "fqye4e3";
const PRIME_ADS = "adSkipButton";
const PRIME_ADS_2 = "afu4rd6c";
const PRIME_ADS_3 = "f1cw2swo";
const PRIME_CREDITS = "f1oordr3";
const PRIME_NEXT = "fd8k8m6";

const APPLETV_ADS = "fd8k8m6";

const BUTTONS_DATA_UIA = [NETFLIX_SKIP_INTRO_DATA_UIA, NETFLIX_RECAP_UIA, NETFLIX_NEXT_UIA, NETFLIX_NEXT_DRAIN_UIA];
const BUTTONS_DATA_TESTID = [DISNEY_NEXT_EPISODE_TEST_ID];
const BUTTONS_CLASSLIST = [DISNEY_INTRO_CLASS, PRIME_RECAP, PRIME_RECAP_2, PRIME_RECAP_3, PRIME_ADS, PRIME_ADS_2, PRIME_ADS_3, PRIME_CREDITS, PRIME_NEXT];

async function skipper() {
  let skipIntro, skipRecap, skipNext, skipAds;
  let button_data_uia, button_data_testid, button_classlist;
  
  try {
    let result = await chrome.storage.local.get(["skipIntro", "skipRecap", "skipNext", "skipAds"]);
      skipIntro = result.skipIntro;
      skipRecap = result.skipRecap;
      skipNext = result.skipNext;
      skipAds = result.skipAds;

    const mapper = {
          // Netflix
          [NETFLIX_SKIP_INTRO_DATA_UIA]: skipIntro,
          [NETFLIX_RECAP_UIA]: skipRecap,
          [NETFLIX_NEXT_UIA]: skipNext,
          [NETFLIX_NEXT_DRAIN_UIA]: skipNext,
          // Prime Video
          [PRIME_RECAP]: skipRecap,
          [PRIME_RECAP_2]: skipRecap,
          [PRIME_RECAP_3]: skipRecap,
          [PRIME_ADS]: skipAds,
          [PRIME_ADS_2]: skipAds,
          [PRIME_ADS_3]: skipAds,
          [PRIME_CREDITS]: skipNext,

          [DISNEY_INTRO_CLASS]: skipIntro,
          [DISNEY_NEXT_EPISODE_TEST_ID]: skipNext
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

  } catch (err) {
    console.error(err);
  }
}

if (document.location.host.includes(".netflix.") || document.location.host.includes(".primevideo.") || document.location.host.includes(".disneyplus.") || document.location.host.includes(".appletv.")) {
  setInterval(() => skipper(), 500);
}
