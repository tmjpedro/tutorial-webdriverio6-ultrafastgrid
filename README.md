# Applitools Tutorial - WebdriverIO 6

## Pre-Requisites
1. Selenium Standalone Server (<https://www.seleniumhq.org/download/>)
2. Chrome Webdriver is on your machine and is in the PATH
    * Download the latest Chrome Webdriver https://chromedriver.chromium.org/
    * Setting it up (skip the download): https://splinter.readthedocs.io/en/0.1/setup-chrome.html
    * Or install with Homebrew: https://stackoverflow.com/questions/38081021/using-selenium-on-mac-chrome
    * Install on Windows: https://www.youtube.com/watch?v=dz59GsdvUF8 
3. Node.js (<https://nodejs.org/en/>)
4. Applitools API key
    * Login to Applitools > Click on the Person icon > My API Key

## Getting Started

### Running the Example Project
1. Clone or download the repository and navigate to that folder
```
git clone https://github.com/applitools/tutorial-webdriverio6-ultrafastgrid
cd tutorial-webdriverio6-ultrafastgrid
```
2. Install the dependencies
```
npm install
```
3. Start the Selenium Server (jar file)
```
`java -jar ./path/to/selenium-server-standalone.jar`
```
*This will run Selenium on localhost and on port 4444*
4. Run the example test
```
APPLITOOLS_API_KEY="[Your API Key]" npm test
```

### Adding Applitools Eyes to an Existing Node.js WebdriverIO Project

Install Applitools Eyes dependencies:
```
npm install @applitools/eyes-webdriverio --save-dev
```

## More Information

Learn more about Applitools [Eyes](https://info.applitools.com/ucY77) and [Ultrafast Test Cloud](https://info.applitools.com/ucY78) at [applitools.com](https://info.applitools.com/ucY76).