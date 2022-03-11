const NETFLIX_INTRO_UIA = "player-skip-intro";
const NETFLIX_RECAP_UIA = "player-skip-recap";
const NETFLIX_NEXT_UIA = "next-episode-seamless-button";
const NETFLIX_NEXT_DRAIN_UIA = "next-episode-seamless-button-draining";

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

const BUTTONS = [NETFLIX_INTRO_UIA, NETFLIX_RECAP_UIA, NETFLIX_NEXT_UIA, NETFLIX_NEXT_DRAIN_UIA];
const BUTTONS_ID = [DISNEY_NEXT_EPISODE_TEST_ID];
const BUTTONS_CLASS = [DISNEY_INTRO_CLASS, PRIME_RECAP, PRIME_RECAP_2, PRIME_RECAP_3, PRIME_ADS, PRIME_ADS_2, PRIME_ADS_3, PRIME_CREDITS, PRIME_NEXT];
const LINK_CLASS = [PRIME_RECAP, PRIME_RECAP_2, PRIME_RECAP_3, PRIME_ADS, PRIME_ADS_2, PRIME_ADS_3, PRIME_CREDITS, PRIME_NEXT];


async function skipper() {
  try {
    chrome.storage.local.get(
      ["skipIntro", "skipRecap", "skipNext", "skipAds"],
      ({ skipIntro, skipRecap, skipNext, skipAds }) => {
        const mapper = {
          // Netflix
          [NETFLIX_INTRO_UIA]: skipIntro,
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
          [PRIME_NEXT]: skipNext,
          // DisneyPlus
          [DISNEY_INTRO_CLASS]: skipIntro,
          [DISNEY_NEXT_EPISODE_TEST_ID]: skipNext
        };
        BUTTONS.forEach((uia) => {
          const button = Object.values(
            document.getElementsByTagName("button")
          ).find((elem) => elem.getAttribute("data-uia") === uia);
          if (button && mapper[uia]) {
            button.click();
            // console.log("Skipped " + uia);
          }
        });
        BUTTONS_ID.forEach((id) => {
          const button = Object.values(
            document.getElementsByTagName("button")
          ).find((elem) => elem.getAttribute("data-testid") === id);
          if (button && mapper[id]) {
            button.click();
            // console.log("Skipped " + id);
          }
        });
        BUTTONS_CLASS.forEach((id) => {
          const button = Object.values(
            document.getElementsByTagName("button")
          ).find((elem) => elem.classList.contains(id));
          if (button && mapper[id]) {
            button.click();
            // console.log("Skipped " + id);
          }
        });
        BUTTONS_CLASS.forEach((clazz) => {
          const link = Object.values(
            document.getElementsByTagName("div")
          ).find((elem) => elem.classList.contains(clazz));
          if (link && mapper[clazz]) {
            link.click();
            // console.log("Skipped " + clazz);
          }
        });
      }
    );
  } catch (err) {
    console.error(err);
  }
}

if (document.location.host.includes(".netflix.") || document.location.host.includes(".primevideo.") || document.location.host.includes(".disneyplus.")) {
  setInterval(() => skipper(), 500);
}
