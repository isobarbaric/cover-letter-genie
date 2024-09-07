const pageHtml = document.documentElement.outerHTML;

// send the html to the background script
chrome.runtime.sendMessage({ type: 'page_html', html: pageHtml });
