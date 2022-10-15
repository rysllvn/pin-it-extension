let selecting = false;
let injected = false;

const handleClick = () => {
  if (selecting) {
    selecting = false;
    browser.runtime.sendMessage('cancel');
    return;
  }
  if (injected) {
    browser.runtime.sendMessage('select');
    selecting = true;
  }
  selecting = true;
  browser.tabs.executeScript({
    file: './content.js'
  });
};
const handleMessage = () => {
  selecting = false;
};
browser.runtime.onMessage.addListener(handleMessage)
browser.browserAction.onClicked.addListener(handleClick);
