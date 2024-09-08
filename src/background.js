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

let iconPath = 'icons/black-icon128.png';

const toggleIcon = (postingOpen) => {
  if (postingOpen) {
    iconPath = 'icons/blue-icon128.png';
  } else {
    iconPath = 'icons/black-icon128.png';
  }

  chrome.action.setIcon({ path: iconPath });
}

chrome.runtime.onInstalled.addListener(({reason}) => {
  if (reason === 'install') {
    console.log("WaterlooWorks Cover Letter Genie (V1.0)");
  }
});


// run the content script when navigating to a new tab without having to reload the page
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabId = activeInfo.tabId;

  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.bundle.js'],
  });
});


// TODO: have content script send html without having to reload the page 
// listen for messages from the content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'page_html') {
    const parsedData = extractData(message.html);
    console.log(parsedData);

    if (isPosting(parsedData)) {
      toggleIcon(true);
      //chrome.runtime.sendMessage({ type: 'job_posting', jobPosting: parsedData });
      chrome.runtime.onConnect.addListener((port) => {
        port.postMessage({ type: 'job_posting', jobPosting: parsedData });
      });
    } else {
      toggleIcon(false);
      //chrome.runtime.sendMessage({ type: 'job_posting', jobPosting: null });
      chrome.runtime.onConnect.addListener((port) => {
        port.postMessage({ type: 'job_posting', jobPosting: null });
      });
    }
  }
});
