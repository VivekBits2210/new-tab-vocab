chrome.browserAction.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.create({ active: true });
});

chrome.runtime.onInstalled.addListener(function () {
    // open a new tab after installing :)
    chrome.tabs.create({
        active: true
    });
});
