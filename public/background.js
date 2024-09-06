//chrome.runtime.onInstalled.addListener(({reason}) => {
//  if (reason === 'install') {
//    chrome.tabs.create({
//      url: "onboarding.html"
//    });
//  }
//});


// fires when the active tab changes
// can't use activeInfo directly since it doesn't contain url info
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabId = activeInfo.tabId;

  let url = null;
  try {
    const tab = await chrome.tabs.get(tabId);
    url = tab.url;
  } catch (error) {
    console.error('Failed to get tab information:', error);
  }

  try {
    updateIconBasedOnUrl(url);
  } catch (error) {
    console.error('Failed to update icon:', error);
  }
});

//chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
//  if (changeInfo.status === 'complete') {
//    currentTabUrl = tab.url;
//    chrome.runtime.sendMessage({ type: 'TAB_UPDATED', url: currentTabUrl });
//  }
//});

const WATERLOO_WORKS_URL = "https://waterlooworks.uwaterloo.ca/myAccount/contract/jobs.htm"

function updateIconBasedOnUrl(url) {
  let iconPath = 'black-icon16.png';

  if (url.includes(WATERLOO_WORKS_URL)) {
    iconPath = 'blue-icon16.png';
  } 

  chrome.action.setIcon({ path: iconPath });
}

