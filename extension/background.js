import extractData from './parser.js';

// check if all values in the object are undefined
const isPosting = (obj) => {
  for (const key in obj) {
    if (obj[key] !== undefined) {
      return false;
    }
  }

  return true;
}

let iconPath = 'black-icon16.png';

const toggleIcon = (postingOpen) => {
  if (postingOpen) {
    iconPath = 'blue-icon16.png';
  } else {
    iconPath = 'black-icon16.png';
  }

  chrome.action.setIcon({ path: iconPath });
}

//chrome.runtime.onInstalled.addListener(({reason}) => {
//  if (reason === 'install') {
//    chrome.tabs.create({
//      url: "onboarding.html"
//    });
//  }
//});


// TODO: have content script send html without having to reload the page 
// listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'page_html') {
    const parsedData = extractData(message.html);
    console.log(parsedData);

    if (isPosting(parsedData)) {
      console.log("No data found in the page");
      toggleIcon(false);
      return;
    }

    console.log("posting happened");
    toggleIcon(true);
  }
});
