// Popup html page's js file

function receiveMessage(message) {
    console.log('treceve')
    if (message.attendance != undefined) {
        clearChildNodes(document.getElementById('absentees'))
        clearChildNodes(document.getElementById('extras'))
        for (var i = 0; i < message.attendance.absentees.length; i++) {
            appendTextContent('absentees', message.attendance.absentees[i])
        }
        for (var i = 0; i < message.attendance.extras.length; i++) {
            appendTextContent('extras', message.attendance.extras[i])
        }
    } else {
        appendTextContent('appendContentJsMsgs', JSON.stringify(message))
    }
}

var intervalId = window.setInterval(function () {
    msgActiveTab({ action: "change_title" })
}, 300); //update attendance twce every sec when popup opened

function appendTextContent(element, name) {
    var node = document.createElement("div");
    node.appendChild(document.createTextNode(name));

    document.getElementById(element).appendChild(node);
}

function toggleCommandsInput() {
    inputField = document.getElementById('commandsInput')
    if (inputField.hidden) {
        inputField.hidden = false
    } else {
        inputField.hidden = true
    }
}

function clearChildNodes(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}

function enteredCommand(input) {
    console.log('eysseses')
    clearChildNodes(document.getElementById('appendContentJsMsgs'))
    appendTextContent('appendContentJsMsgs', input)
}

function msgActiveTab(message) {

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, message);
    });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    receiveMessage(message)
});

commandsButton.addEventListener("click", async () => {
    toggleCommandsInput()
});

change_title.addEventListener("click", async () => {
    msgActiveTab({ action: "change_title" })
});

document.getElementById('commandsInput').addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        enteredCommand(document.getElementById('commandsInput').value)
    }
});

function setLocalStrorageData(data) {
    chrome.storage.local.set(data, function () { });
}

function getLocalStrorageData(key) {
    chrome.storage.local.get([key], function (result) {
        console.log(result);
        return result
    });
}

function clearLocalStorageData() {
    chrome.storage.local.clear(function () {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });
}
