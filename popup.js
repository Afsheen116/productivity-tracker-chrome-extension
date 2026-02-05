const statsDiv = document.getElementById("stats");
const status = document.getElementById("status");

status.textContent = "Tracking browsing time automatically ⏱️";

chrome.storage.local.get(null, (data) => {
  statsDiv.innerHTML = "";

  if (!data || Object.keys(data).length === 0) {
    statsDiv.textContent = "No data yet";
    return;
  }

  for (const url in data) {
    const timeMs = data[url];
    const min = Math.floor(timeMs / 60000);
    const sec = Math.floor((timeMs % 60000) / 1000);

    const div = document.createElement("div");
    div.textContent = `${url} → ${min}m ${sec}s`;
    div.style.fontSize = "13px";
    div.style.marginBottom = "6px";

    statsDiv.appendChild(div);
  }
  const openBtn = document.getElementById("openDashboard");

if (openBtn) {
  openBtn.addEventListener("click", () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("dashboard.html")
    });
  });
}

});


