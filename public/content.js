// TODO: get this to only fire when the user is on the WaterlooWorks page

const pageHtml = document.documentElement.outerHTML;
console.log(pageHtml);

// send the html to the background script
chrome.runtime.sendMessage({ type: 'page_html', html: pageHtml });
