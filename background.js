chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);

    if (tab.url) {
      console.log("Active Tab Changed");
      console.log("Tab ID:", tab.id);
      console.log("URL:", tab.url);
      console.log("Title:", tab.title);
    }
  } catch (error) {
    console.error("Error fetching tab info:", error);
  }
});
// Listen for window focus changes
chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    chrome.tabs.query({ active: true, windowId }, (tabs) => {
      if (tabs[0]?.url) {
        console.log("Window Focus Changed");
        console.log("URL:", tabs[0].url);
      }
    });
  }
});
// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active && tab.url) {
    console.log("Tab Updated");        
    console.log("Tab ID:", tabId);
    console.log("URL:", tab.url);
    console.log("Title:", tab.title);
  }
});