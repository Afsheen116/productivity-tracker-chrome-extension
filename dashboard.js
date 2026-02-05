const dataDiv = document.getElementById("data");

chrome.storage.local.get(null, (data) => {
  dataDiv.innerHTML = "";

  if (!data || Object.keys(data).length === 0) {
    dataDiv.textContent = "No data available";
    return;
  }

  for (const url in data) {
    // Skip chrome internal pages
    if (url.startsWith("chrome://")) continue;

    const ms = data[url];
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);

    const div = document.createElement("div");
    div.className = "site";
    div.textContent = `${url} → ${min}m ${sec}s`;

    dataDiv.appendChild(div);
  }
});
