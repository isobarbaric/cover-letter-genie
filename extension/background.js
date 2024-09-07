import extractData from './parser.js';

// check if all values in the object are undefined
const isPosting = (obj) => {
  for (const key in obj) {
    if (obj[key] !== undefined) {
      return true;
    }
  }

  return false;
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

chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'install') {
    console.log("WaterlooWorks Cover Letter Genie (V1.0)");
    //chrome.tabs.create({
    //  url: "onboarding.html"
    //});
  }
});

// TODO: have content script send html without having to reload the page 
// listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'page_html') {
    const parsedData = extractData(message.html);

    if (isPosting(parsedData)) {
      toggleIcon(true);
      console.log(parsedData);
    } else {
      toggleIcon(false);
      console.log('No posting detected');
    }
  }
});
