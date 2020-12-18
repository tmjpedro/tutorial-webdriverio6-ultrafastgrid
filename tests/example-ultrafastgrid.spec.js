'use strict';

const {
  VisualGridRunner,
  RunnerOptions,
  Eyes,
  Target,
  Configuration,
  BatchInfo,
  BrowserType,
  DeviceName,
  ScreenOrientation
} = require('@applitools/eyes-webdriverio');

let eyes;
let runner;
let configuration;

describe('ACME Demo App - wdio6', function () {
  
  before(async () => {
    // Create a runner with concurrency of 30
    
    const runnerOptions = new RunnerOptions().testConcurrency(30);
    
    runner = new VisualGridRunner(runnerOptions);
    
    // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.

    eyes = new Eyes(runner);
    
    if (browser.config.enableEyesLogs) {
      eyes.setLogHandler(new ConsoleLogHandler(true));
    }
  });
  
  beforeEach(async function () {
    
    // Initialize the eyes configuration
    const configuration = new Configuration();
    
    // You can get your api key from the Applitools dashboard
    configuration.setApiKey(process.env.APPLITOOLS_API_KEY)
    
    // create a new batch info instance and set it to the configuration
    configuration.setBatch(new BatchInfo('Ultrafast Batch'))
    
    var appName = await this.test.parent.title;
    var testName = await this.currentTest.title;
    
    // Add browsers with different viewports
    configuration.setAppName(appName);
    configuration.setTestName(testName);
    configuration.addBrowser(800, 600, BrowserType.CHROME);
    configuration.addBrowser(700, 500, BrowserType.FIREFOX);
    configuration.addBrowser(1600, 1200, BrowserType.IE_11);
    configuration.addBrowser(1024, 768, BrowserType.EDGE_CHROMIUM);
    configuration.addBrowser(800, 600, BrowserType.SAFARI);
    
    // Add mobile emulation devices in Portrait mode
    configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    configuration.addDeviceEmulation(DeviceName.Pixel_2, ScreenOrientation.PORTRAIT);
    
    // Set the configuration to eyes
    eyes.setConfiguration(configuration);
    
    await eyes.open(browser)
  });
  
  
  it('ultraFastTest', async () => {
    
    // Navigate to the url we want to test
    
    await browser.url('https://demo.applitools.com/')
    
    await expect(browser).toHaveTitle('ACME demo app');
    
    // ⭐️ Note to see visual bugs, run the test using the above URL for the 1st run.
    // but then change the above URL to https://demo.applitools.com/index_v2.html
    // (for the 2nd run)
    
    // check the login page with fluent api, see more info here
    // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html
    
    await eyes.check('Login Window', Target.window().fully())
    
    // Click the "Log in" button.
    const loginButton = await browser.$('#log-in');
    await loginButton.click();
    
    // Check the app page
    await eyes.check('App Window', Target.window().fully())
    
    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();
  });
  
  afterEach(async () => {
    const results = await runner.getAllTestResults(false);
    //print or assert results array objects here...
    
    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortAsync();
  });
  
});