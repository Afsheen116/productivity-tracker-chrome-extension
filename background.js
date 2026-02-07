
let currentTabId = null;
let currentUrl = null;
let startTime = null;
function saveTimeSpent(url, timeSpent) {
    chrome.storage.local.get([url], (result) => {
        const previousTime = result[url] || 0;
        chrome.storage.local.set({
            [url]: previousTime + timeSpent
        });
    });
}

// Listen for tab activation changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {

    const now = Date.now();

    // ⏱️ Save time for previous tab
    if (currentUrl && startTime) {
    const timeSpent = now - startTime;
    console.log("Time spent (ms):", timeSpent);
    saveTimeSpent(currentUrl, timeSpent);
}

    function getTodayKey() {
  const today = new Date();
  return today.toISOString().split("T")[0]; // YYYY-MM-DD
}

function saveTimeSpent(url, timeSpent) {
  const todayKey = getTodayKey();

  chrome.storage.local.get([todayKey, "ALL_TIME"], (result) => {
    const todayData = result[todayKey] || {};
    const allTimeData = result["ALL_TIME"] || {};

    todayData[url] = (todayData[url] || 0) + timeSpent;
    allTimeData[url] = (allTimeData[url] || 0) + timeSpent;

    chrome.storage.local.set({
      [todayKey]: todayData,
      ALL_TIME: allTimeData
    });
  });
}

});
// Listen for window focus changes
chrome.windows.onFocusChanged.addListener((windowId) => {
  const now = Date.now();

  if (currentUrl && startTime) {
    saveTimeSpent(currentUrl, now - startTime);
    startTime = null;
  }

  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    chrome.tabs.query({ active: true, windowId }, (tabs) => {
      if (tabs[0]?.url) {
        currentTabId = tabs[0].id;
        currentUrl = tabs[0].url;
        startTime = Date.now();

        console.log("Window Focus Changed");
        console.log("URL:", currentUrl);
      }
    });
  }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active && tab.url) {
    const now = Date.now();

    if (currentUrl && startTime) {
      saveTimeSpent(currentUrl, now - startTime);
    }

    currentTabId = tabId;
    currentUrl = tab.url;
    startTime = now;

    console.log("Tab URL Changed");
    console.log("New URL:", currentUrl);
  }
});
