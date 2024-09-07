import extractData from './parser.js';

const WATERLOO_WORKS_URL = "https://waterlooworks.uwaterloo.ca/myAccount/co-op/full/jobs.htm";

//chrome.runtime.onInstalled.addListener(({reason}) => {
//  if (reason === 'install') {
//    chrome.tabs.create({
//      url: "onboarding.html"
//    });
//  }
//});

// TODO: save global variable for the current tab URL for extra validation in the onMessage listener

// fires when the active tab changes
// can't use activeInfo directly since it doesn't contain url info
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // when the URL changes (new page opened)
  if (changeInfo.url) {
    console.log('Tab updated with new URL:', changeInfo.url);

    let currentURL = changeInfo.url;

    console.log('Updating icon based on URL:', currentURL);
    try {
      updateIconBasedOnUrl(currentURL);
      console.log('Icon updated based on new URL');
    } catch (error) {
      console.error('Failed to update icon:', error);
    }
  }
});

//chrome.tabs.onActivated.addListener(async (activeInfo) => {
//  const tabId = activeInfo.tabId;
//  //console.log('Tab activated:', tabId);
//
//  let currentURL = null;
//  try {
//    const tab = await chrome.tabs.get(tabId);
//    currentURL = tab.url;
//    console.log('Current URL:', currentURL);
//  } catch (error) {
//    console.error('Failed to get tab information:', error);
//  }
//
//  //console.log("Updating icon based on URL:", currentURL);
//  try {
//    updateIconBasedOnUrl(currentURL);
//    console.log("Icon updated based on URL");
//  } catch (error) {
//    console.error('Failed to update icon:', error);
//  }
//});
//

let iter = 1;

// listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("iter number:", iter);
  iter += 1;
  if (message.type === 'page_html') {
    console.log("Received message from content script:", message);
    const parsedData = extractData(message.html);
    console.log("Parsed data:", parsedData);
  }
});


//chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
//  if (changeInfo.status === 'complete') {
//    currentTabUrl = tab.url;
//    chrome.runtime.sendMessage({ type: 'TAB_UPDATED', url: currentTabUrl });
//  }
//});


function updateIconBasedOnUrl(url) {
  let iconPath = 'black-icon16.png';
  if (url.includes(WATERLOO_WORKS_URL)) {
    iconPath = 'blue-icon16.png';
  } 
  chrome.action.setIcon({ path: iconPath });
}

