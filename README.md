# Microsoft Teams Attendance

A Chrome extension (Manifest V3) for taking attendance in a Microsoft Teams
meeting without clicking through the participant list by hand.

Open the popup while a meeting is running: it reads the meeting roster, diffs it
against the class list you saved, and shows who is **absent** and who is present
but not on the list (**extras**).

## Install (unpacked)

1. Open `chrome://extensions`
2. Turn on **Developer mode** (top right)
3. Click **Load unpacked** and select this folder

It asks for `storage`, `activeTab`, `scripting` and `tabs`, plus access to
`teams.live.com` and `teams.microsoft.com` — nothing else.

## Using it

1. Join the Teams meeting in the same browser
2. Click the extension icon — the popup lists absentees and extras
3. **Update Attendance** re-reads the roster, and while the popup is open it
   refreshes about three times a second, so the lists follow who joins or leaves

The expected class list is kept in the extension's own local storage
(`chrome.storage.local`), so it stays on your machine.

## How it works

- `content.js` is injected into the Teams pages. It opens the roster pane,
  scrapes the participant names and compares them with the saved class list.
- `background.js` is the MV3 service worker; the popup and the page talk to each
  other through it.
- `module.js` holds the small storage and tab-messaging helpers.
- `popup/` is the popup UI — `popup.html`, `popup.js`, `popup.css`.
- `images/` are the extension icons.

## Rough edges

- The scraping is written against Teams' current DOM (`#roster-button` and
  friends), so a Teams redesign will break it.
- The **Commands** box in the popup is a stub: it echoes what you type instead of
  acting on it.
