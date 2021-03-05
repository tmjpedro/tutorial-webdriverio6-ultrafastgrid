# Applitools Tutorial - WebdriverIO 6

Get started with Applitools Ultrafast Test Grid with this example of using the VisualGridRunner from the Applitools Webdriver SDK.

## Pre-Requisites

1. Chrome Webdriver is on your machine and is in the PATH
   - Download the latest Chrome Webdriver https://chromedriver.chromium.org/
   - Setting it up (skip the download): https://splinter.readthedocs.io/en/0.1/setup-chrome.html
   - Or install with Homebrew: https://stackoverflow.com/questions/38081021/using-selenium-on-mac-chrome
   - Install on Windows: https://www.youtube.com/watch?v=dz59GsdvUF8
2. Node.js (<https://nodejs.org/en/>)
3. Applitools API key
   - Login to Applitools > Click on the Person icon > My API Key

## Getting Started

### Running the Example Project

1. Clone or download the repository and navigate to that folder

```
git clone https://github.com/applitools/tutorial-webdriverio6-ultrafastgrid
cd tutorial-webdriverio6-ultrafastgrid
```

_Note: you can alternatively download the project as a Zip file and extract it_

2. Install the dependencies

```
npm install
```

3. Install ChromeDriver
   You'll additionally need chromedriver to run the project. To avoid version mismatches, make sure to install the version of Chrome that matches your system.

To install the latest version, run:

```
npm install chromedriver
```

To install a specific version of chromedriver, run:

```
npm install chromedriver@[version]
# Ex: npm install chromedriver@88.0.0
```

4. Run the example test

```
BASE_URL="[your base url]" APPLITOOLS_API_KEY="[Your API Key]" npm test
```

This will first set your `BASE_URL` and `APPLITOOLS_API_KEY` into the node process then run `npm test`.

### Adding Applitools Eyes to an Existing Node.js WebdriverIO Project

Install Applitools Eyes dependencies:

```
npm install @applitools/eyes-webdriverio --save-dev
```

## More Information

Learn more about Applitools [Eyes](https://info.applitools.com/ucY77) and [Ultrafast Test Cloud](https://info.applitools.com/ucY78) at [applitools.com](https://info.applitools.com/ucY76).
