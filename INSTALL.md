# Skipfast

## Make it work locally 

Step 1: Access Chrome Extensions Settings.
Alternatively, you can directly enter the following URL in the address bar: chrome://extensions/ 

Once you are on the Extensions page, toggle on the “Developer mode” switch located in the top-right corner. This will enable advanced options for testing and loading unpacked extensions.

After enabling Developer mode, three new buttons will appear at the top of the Extensions page. Click on the “LOAD UNPACKED” button.

Step 2: Select the Unzipped Extension Folder
A file browser window will open. Navigate to the unzipped build folder of the extension that you downloaded in Step 1. Select the folder and click “OK” or “Open” to proceed.


## Find a tag or an element :

Console: 

a. Open the console tab in Developer Tools

b. Enter the below command command to pause execution and display “paused in debugger”

setTimeout(function() {
debugger;
}, 3000);



## Explanation

This code is a JavaScript script that appears to be designed to automate the process of skipping intros, recaps, ads, and moving to the next episode on various streaming platforms like Netflix, Prime Video, Disney+, and Apple TV.

Here's a breakdown of what the code does:

It defines constants for various UI elements and button classes on different streaming platforms.
It defines arrays for different types of buttons used on these platforms.
Inside the skipper function, it retrieves settings from Chrome local storage for skipping intro, recap, next episode, and ads.
It uses a mapper object to map UI elements to the respective settings.
It iterates through the arrays of UI elements and button classes to find and click the corresponding buttons based on the settings retrieved from local storage.
The code uses setInterval to repeatedly call the skipper function every 500 milliseconds to continuously check for and skip content based on the defined settings.
The script runs if the current web page's host includes ".netflix.", ".primevideo.", ".disneyplus.", or ".appletv."
This script essentially automates the process of skipping content on streaming platforms, making it more convenient for users who want to bypass intros, recaps, ads, or move to the next episode without manual interaction. It uses Chrome local storage to store user preferences for skipping specific content elements. The code relies on specific button attributes or class names to identify and interact with the relevant UI elements on different platforms.

## Links
chrome://extensions/
https://github.com/GoogleChrome/chrome-extensions-samples
 