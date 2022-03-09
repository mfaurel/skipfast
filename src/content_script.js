const INTRO_UIA = "player-skip-intro";
const RECAP_UIA = "player-skip-recap";
const NEXT_UIA = "next-episode-seamless-button";
const NEXT_DRAIN_UIA = "next-episode-seamless-button-draining";
const NETFLIX = 'Netflix';
const PRIME = 'Prime Video';
const DISNEY = 'Disney+';

const BUTTONS = [INTRO_UIA, RECAP_UIA, NEXT_UIA, NEXT_DRAIN_UIA];

async function skipper() {
  try {
    chrome.storage.local.get(
      ["skipIntro", "skipRecap", "skipNext"],
      ({ skipIntro, skipRecap, skipNext }) => {
        const mapper = {
          [INTRO_UIA]: skipIntro,
          [RECAP_UIA]: skipRecap,
          [NEXT_UIA]: skipNext,
          [NEXT_DRAIN_UIA]: skipNext,
        };
        BUTTONS.forEach((uia) => {
          const button = Object.values(
            document.getElementsByTagName("button")
          ).find((elem) => elem.getAttribute("data-uia") === uia);
          if (button && mapper[uia]) {
            button.click();
          }
        });
      }
    );
  } catch (err) {
    console.error(err);
  }
}

if (document.location.host.includes(".netflix.")) {
  setInterval(() => skipper(), 500);
}

async function skippy() {
  try {
    const skipSelectors = [
      // Netflix
      {
        platform: NETFLIX,
        info: 'Skipping credits.',
        selector: '.skip-credits > a'
      },
      {
        platform: NETFLIX,
        info: 'Playing next episode.',
        selector: '[data-uia="next-episode-seamless-button"]'
      },
      {
        platform: NETFLIX,
        info: 'Continue playing.',
        selector: `[aria-label='Continue Playing']`
      },
      {
        platform: NETFLIX,
        info: 'Skipping recap.',
        selector: `[aria-label='Skip Recap']`
      },
      {
        platform: NETFLIX,
        info: 'Skipping intro.',
        selector: `[aria-label='Skip Intro']`
      },
      // Prime Video
      {
        platform: PRIME,
        info: 'Skipping credits.',
        selector: '.f1oordr3'
      },
      {
        platform: PRIME,
        info: 'Playing next episode.',
        selector: '.fd8k8m6'
      },
      {
        platform: PRIME,
        info: 'Skipping ad.',
        selector: '.adSkipButton'
      },
      {
        platform: PRIME,
        info: 'Skipping recap.',
        selector: '.skipElement'
      },
      {
        platform: PRIME,
        info: 'Skipping recap.',
        selector: '.atvwebplayersdk-skipelement-button'
      },
      {
        platform: PRIME,
        info: 'Skipping recap.',
        selector: '.fqye4e3'
      },
//  fqye4e3 fovm8oe fez7z67 fektfsf fif0hcs f177tia9 fww9brl f1nxf0rp f1ylp05h atvwebplayersdk-skipelement-button f1cg7427 f989gul f1rjin6j f19qnh9o
      // Disney Plus
      {
        platform: DISNEY,
        info: 'Skipping credits',
        selector: '.skip__button'
      },
      {
        platform: DISNEY,
        info: 'Playing next episode',
        selector: 'button.sc-gipzik.play'
      },
    ];
    for (skipSelector of skipSelectors) {
      const skipButton = document.querySelector(skipSelector.selector);
      if (skipButton) {
        skipButton.click();
        console.log(`${skipSelector.platform}: ${skipSelector.info}`);
        break;
      }
    }
  } catch (err) {
    console.error(err);
  }
}

if (document.location.host.includes(".primevideo.")) {
  setInterval(() => skippy(), 500);
}
