Bug ?  Problème de recherche dans appleTV
Feat : Prime & Disney

-*-**-*-*-*-*-*-*-*-*-*-*-
Liste de séries pour tester chacun des cas de skip
 
Test de Netflix ok  :
Hunter X Hunter 117 récap intro : https://www.netflix.com/watch/80150556?trackId=254794450

Test de AppleTV ok :
Episode 8 The Morning Show : https://tv.apple.com/fr/episode/la-solitude-du-pouvoir/umc.cmc.231w1pa6pm3ocsma0mw7zueaj


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
*/