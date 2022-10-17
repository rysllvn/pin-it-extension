browser.browserAction.onClicked.addListener(() => {
  browser.tabs.query({currentWindow: true, active: true})
    .then(tabs => {
      if (typeof tabs[0] !== 'undefined' && typeof tabs[0].id === 'number') {
        browser.tabs.sendMessage(tabs[0].id, 'toggle');
      }
    })
});
