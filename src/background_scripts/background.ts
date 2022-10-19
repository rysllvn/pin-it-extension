browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
  if (temporary) return; // skip during development
  switch (reason) {
    case "install":
      {
        await browser.tabs.create({ url: 'https://rysllvn.github.io/pin-it-info-page/' });
      }
      break;
    // see below
  }
});

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({currentWindow: true, active: true})
    .then(tabs => {
      if (typeof tabs[0] !== 'undefined' && typeof tabs[0].id === 'number') {
        browser.tabs.create({ url: 'https://rysllvn.github.io/pin-it-info-page/' });
        browser.tabs.sendMessage(tabs[0].id, 'toggle');
      }
    })
});
