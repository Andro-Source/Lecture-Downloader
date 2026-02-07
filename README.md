# Lecture Downloader 🎓

A lightweight Chrome Extension designed to intercept HLS streams and convert them into downloadable, progressive MP4 files. Specifically optimized for Kaltura-based lecture podcasts and university media portals.

## 🚀 Installation

Since this extension is in developer mode, follow these steps to install it:

1.  **Download the Extension:**
    * Download the project as a `.zip` file from the repository.
    * Extract (unzip) the file into a dedicated folder on your computer.
2.  **Open Chrome Extensions:**
    * Open Google Chrome and navigate to `chrome://extensions/`.
3.  **Enable Developer Mode:**
    * In the top-right corner, toggle the **Developer mode** switch to **ON**.
4.  **Load the Extension:**
    * Click the **Load unpacked** button in the top-left.
    * Select the folder where you unzipped the extension files.
5.  **Pin for Access:**
    * Click the "Puzzle" icon in your Chrome toolbar and pin **Lecture Downloader** for easy access.

---

## 📖 How to Use

Follow these steps to capture and download your lectures:

### 1. Navigate to the Lecture
Go to your university portal (e.g., Canvas, Blackboard) or the direct link to the **Lecture Podcast** you wish to download.

### 2. Play the Video
The extension "sniffs" the network traffic in real-time. You **must click play** on the lecture video to trigger the initial stream request.

### 3. Watch for the Detection
Once the extension detects a valid media stream:
* The extension icon in your toolbar will show a **colored badge** with a number (e.g., "1").
* This indicates that a "Stream Candidate" has been successfully captured and transformed.

### 4. Download
* Click the extension icon to open the popup.
* Review the list of **Stream Candidates**.
* Click the **Download** button next to the desired video. 
* The video will automatically begin downloading as an unrestricted MP4 file.

---

## 🛠 Troubleshooting

* **No icon appears:** Refresh the page and ensure the video starts playing. Some players require a few seconds of playback before they request the stream segments.
* **404 Error on Download:** This usually means the session token has expired. Refresh the lecture page and try clicking the download button again immediately after the detection badge appears.
* **Multiple Candidates:** If a video has multiple quality settings (720p, 1080p), the extension may list multiple candidates. Choose the one that corresponds to your preferred quality.

---

## 🔒 Privacy & Safety
This extension runs entirely locally on your machine. It does not collect browsing history or send your data to any external servers. It only interacts with media requests specifically matching the designated patterns.
