📌 Productivity Tracker – Chrome Extension

A productivity-focused Chrome extension that tracks time spent on websites to help users understand browsing habits and reduce distractions.

🚀 Features (MVP – Floor Level)

Track active website usage time

Detect currently focused browser tab

Simple popup UI for user interaction

Background service worker (Manifest v3)

Lightweight and privacy-friendly

⚠️ This project is currently in MVP stage and will be enhanced with advanced analytics, reports, and blocking features in future iterations.

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript

Browser APIs: Chrome Extensions API (Manifest v3)

Storage: Chrome Storage (local)

Version Control: Git & GitHub

📂 Project Structure
productivity-tracker-extension/
│
├── manifest.json        # Extension configuration
├── popup.html           # Popup UI
├── popup.css            # Popup styling
├── popup.js             # Popup logic
└── background.js        # Background service worker

🧠 How It Works (High Level)

Chrome loads the extension using manifest.json

Background service worker listens for browser activity

Popup UI allows the user to control and view tracking status

Browsing data is processed locally for productivity insights

🔐 Privacy Note

This extension:

Tracks only active tab domains

Does not collect personal data, passwords, or form inputs

Works entirely under user control

📌 Installation (Developer Mode)

Clone this repository

Open Chrome and go to chrome://extensions

Enable Developer Mode

Click Load unpacked

Select the project folder

📈 Future Enhancements

Daily & weekly productivity reports

Website categorization (productive vs distracting)

Custom block list

Backend integration for data sync

Charts and analytics dashboard
## 🧩 Learning Outcomes

- Understood Chrome Extension architecture (Manifest v3)
- Learned how background service workers operate
- Gained hands-on experience with Chrome APIs
- Practiced clean project setup and documentation
## 🛠️ Development Status

This project is being developed iteratively:
- Initial MVP focused on setup and structure
- Core tracking logic under development
- Polishing and analytics planned next

