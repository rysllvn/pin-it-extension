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
  injected = true;
  browser.tabs.executeScript({
    file: './content.js'
  });
};
const handleMessage = (message: string) => {
  if (message === 'element selected') selecting = false;
};
browser.runtime.onMessage.addListener(handleMessage);
browser.browserAction.onClicked.addListener(handleClick);
