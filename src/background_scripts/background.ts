console.log('hello from service.ts');

browser.contextMenus.create({
  id: "copy-link-to-clipboard",
  title: "Pin link",
  contexts: ["all"],
});
browser.contextMenus.onClicked.addListener((info, tab) => {
  console.log(info, tab);
});
