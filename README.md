# 豆瓣读书x浙江图书馆

This is an Edge browser extension that adds an HTML snippet to the web pages visited by the user. The HTML snippet renders data from an Ajax API call.

## Features

- Adds an HTML snippet to web pages
- Makes Ajax API calls to fetch data
- Renders the fetched data in the HTML snippet

## How to Use

1. Install the extension in your Edge browser.
2. Navigate to a web page where you want the HTML snippet to be added.
3. Click on the extension icon in the toolbar to activate it.
4. The extension will automatically add the HTML snippet to the web page and make an Ajax API call to fetch data.
5. The fetched data will be rendered in the HTML snippet.

## Permissions

The extension requires the following permissions:

- `activeTab`: To access and manipulate the DOM of the web pages visited by the user.
- `http://*/*` and `https://*/*`: To make Ajax API calls to any URL.

## Files

- `src/background.js`: Handles background operations of the extension.
- `src/content.js`: Injected into web pages to add the HTML snippet and make the Ajax API call.
- `src/popup/popup.html`: Defines the HTML structure of the popup.
- `src/manifest.json`: Specifies basic metadata about the extension.
- `icons`: Contains the icons used by the extension.

## Support

If you encounter any issues or have any questions about the extension, please open an issue on this repository.