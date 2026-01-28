// Handles user interaction from the extension popup UI

const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", () => {
  statusText.innerText = "Tracking active for this session";
  startBtn.disabled = true;
  startBtn.innerText = "Tracking...";
});

