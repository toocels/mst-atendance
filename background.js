//background service worker

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        author: "probottpric",
        name: "probot"
    })
    // setLocalStrorageData({ "Author": "Probottpric" })
    // setLocalStrorageData({ "Contact": "pro__bot__004 IG" })
});
