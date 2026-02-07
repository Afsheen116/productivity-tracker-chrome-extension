const dataDiv = document.getElementById("data");
const viewMode = document.getElementById("viewMode");

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function renderDashboard() {
  const key =
    viewMode.value === "TODAY" ? getTodayKey() : "ALL_TIME";

  chrome.storage.local.get(key, (result) => {
    dataDiv.innerHTML = "";

    const data = result[key];
    if (!data || Object.keys(data).length === 0) {
      dataDiv.textContent = "No data available";
      return;
    }

    const domainStats = {};

    for (const url in data) {
      if (
        url.startsWith("chrome://") ||
        url.startsWith("chrome-extension://")
      ) {
        continue;
      }

      const domain = getDomain(url);
      if (!domain) continue;

      domainStats[domain] =
        (domainStats[domain] || 0) + data[url];
    }

    const sortedDomains = Object.entries(domainStats)
      .sort((a, b) => b[1] - a[1]);

    sortedDomains.forEach(([domain, ms]) => {
      const min = Math.floor(ms / 60000);
      const sec = Math.floor((ms % 60000) / 1000);

      const div = document.createElement("div");
      div.className = "site";
      div.textContent = `${domain} → ${min}m ${sec}s`;

      dataDiv.appendChild(div);
    });
  });
}

// Initial + auto-refresh
renderDashboard();
setInterval(renderDashboard, 5000);

// 🔁 Re-render on mode change
viewMode.addEventListener("change", renderDashboard);
