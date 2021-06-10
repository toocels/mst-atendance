function getLocalStrorageData(data_name) {
    return chrome.storage.local.get(data_name)
}

function setLocalStrorageData(json_data) {
    chrome.storage.local.set(json_data)
}

function msgActiveTab(message) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, message);
    });
}