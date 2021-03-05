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

const grid = '[data-test="publishedAppGrid"]';
const table = '[data-test="gridTable"]';
const loginForm = 'form[data-test="sign-in"]';
const emailInput = `${loginForm} input[name="email"]`;
const passwordInput = `${loginForm} input[name="password"]`;
const submitButton = `${loginForm} button`;

const waitForGridDisplayed = async () => { 
  const el = await $(grid);
  await el.waitForDisplayed();
}

const waitForTableDisplayed = async () => { 
  const el = await $(table);
  await el.waitForDisplayed();
}

const waitLoadPage = async () => {
  await waitLoadPage();
}

describe('ACME Demo App - wdio6', function () {

  before(async () => {
    // Create a runner with concurrency of 5
    // You can increase this value if your plan supports a higher concurrency

    const runnerOptions = new RunnerOptions().testConcurrency(5);

    runner = new VisualGridRunner(runnerOptions);

    // Create Eyes object with the runner, meaning it'll be a Visual Grid eyes.

    eyes = new Eyes(runner);

    if (browser.config.enableEyesLogs) {
      eyes.setLogHandler(new ConsoleLogHandler(true));
    }

    // Initialize the eyes configuration

    configuration = eyes.getConfiguration();

    // use new Configuration() when not setting eyes setter methods. e.g. eyes.setLogHandler() etc...
    // new Configuration();

    // You can get your api key from the Applitools dashboard

    configuration.setApiKey(process.env.APPLITOOLS_API_KEY)

    // create a new batch info instance and set it to the configuration

    configuration.setBatch(new BatchInfo('rows'))

    // Add mobile emulation devices in Portrait mode

    //1366x768
    configuration.addBrowser(1366, 768, BrowserType.CHROME);
    //1920x1080
    configuration.addBrowser(1920, 1080, BrowserType.CHROME);
    //1440x900
    configuration.addBrowser(1440, 900, BrowserType.CHROME);

    configuration.addBrowser(1366, 768, BrowserType.FIREFOX);
    configuration.addBrowser(1600, 1200, BrowserType.IE_11);
    configuration.addBrowser(1024, 768, BrowserType.EDGE_CHROMIUM);
    //1440x900
    configuration.addBrowser(1440, 900, BrowserType.SAFARI);

    // Add mobile emulation devices in Portrait mode

    // Safari
    //375x812
    configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);

    //414x896
    configuration.addDeviceEmulation(DeviceName.iPhone_XS_Max, ScreenOrientation.PORTRAIT);

    //375x667
    configuration.addDeviceEmulation(DeviceName.iPhone_6_7_8, ScreenOrientation.PORTRAIT);
    
    // Android
    //393x851	
    configuration.addDeviceEmulation(DeviceName.Pixel_4, ScreenOrientation.PORTRAIT);

    //360x780 ?? nop 720
    configuration.addDeviceEmulation(DeviceName.LG_G6, ScreenOrientation.PORTRAIT);
    
    //360x640
    configuration.addDeviceEmulation(DeviceName.Galaxy_Note_4, ScreenOrientation.PORTRAIT);
  });


  beforeEach(async function () {
    const appName = await this.test.parent.title;
    const testName = await this.currentTest.title;

    configuration.setAppName(appName);
    configuration.setTestName(testName);

    // Set the configuration to eyes

    eyes.setConfiguration(configuration);

    await eyes.open(browser);
  });

  
  it('integrations', async () => {

    // Navigate to the url we want to test

    await browser.url('/integrations');
    await waitLoadPage();
    await eyes.check('Integrations Window', Target.window().fully());

  
    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();
  });

  it('pricing', async () => {

    // Navigate to the url we want to test

    await browser.url('/pricing');
    await waitLoadPage();
    await eyes.check('pricing Window', Target.window().fully());

  
    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();
  });

  it('tamplates', async () => {

    // Navigate to the url we want to test

    await browser.url('/templates');
    await waitLoadPage();
    await eyes.check('Templates Window', Target.window().fully());

  
    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();
  });

  it('about', async () => {

    // Navigate to the url we want to test

    await browser.url('/about');
    await waitLoadPage();
    await eyes.check('About Window', Target.window().fully());

  
    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();
  });

  it('sales', async () => {

    // Navigate to the url we want to test

    await browser.url('/sales');
    await waitLoadPage();
    await eyes.check('sales Window', Target.window().fully());

  
    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();
  });

  it('docs', async () => {

    // Navigate to the url we want to test

    await browser.url('/docs');
    await waitLoadPage();
    await eyes.check('Docs Window', Target.window().fully());

  
    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();
  });

  it('live', async () => {

    // Navigate to the url we want to test

    await browser.url('/hackathon/editor/c3d78c20-7b77-11eb-a5d8-599b64105e91/c3e806e0-7b77-11eb-9376-8161d518f2bb/live');
    await waitForGridDisplayed()
    await waitForTableDisplayed()
    await expect(browser).toHaveTitle('Find LinkedIn profiles');

    await eyes.check('live Window', Target.window().fully());

  
    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();
  });

  it('login', async () => {

    // Navigate to the url we want to test

    await browser.url('/auth/login');
    await waitLoadPage();
    await eyes.check('login Window', Target.window().fully());

    //login

    const email = await $(emailInput);
    //@TODO update credentials
    await email.setValue('username');
    await browser.keys(["Tab","NULL"]);
    const pass = await $(passwordInput)
    await pass.setValue('password');
    await browser.keys(["Tab","NULL"]);

    const btn = await $(submitButton);
    await btn.click();
    
    await waitLoadPage();
    //dashboard
    await eyes.check('dashboard Window', Target.window().fully());

    //workspace/settings/integrations
    await browser.url('/hackathon/settings/integrations');
    await waitLoadPage();
    await eyes.check('integrations Window', Target.window().fully());

    //workspace/settings/usage/integrations
    await browser.url('/hackathon/settings/usage/integrations');
    await waitLoadPage();
    await eyes.check('usage integrations Window', Target.window().fully());

    //workspace/settings/billing
    await browser.url('/hackathon/settings/billing');
    await waitLoadPage();
    await eyes.check('billing Window', Target.window().fully());

    const createApp = await $('[data-test="createApp-headerButton"]');
    await createApp.click();
    await waitLoadPage();
    await eyes.check('editor Window', Target.window().fully());

    //start typing in A1

    await browser.keys(["Hackathon"]);
    await eyes.check('editor A1 focus', Target.window().fully());

    await browser.keys(["Enter"]);
    await eyes.check('editor A1 submited', Target.window().fully());

    const integrationsPanelBtn = await $('[data-test="integrationsPanelBtn"]');
    await integrationsPanelBtn.click();
    await waitLoadPage();
    await eyes.check('integrationsPanel Window', Target.window().fully());

    const SidePanelHeaderCloseBtn = await $('[data-test="SidePanelHeaderCloseBtn"]');
    await SidePanelHeaderCloseBtn.click();
    await browser.pause(500);

    const functionHelperBtn = await $('[data-test="functionHelperBtn"]');
    await functionHelperBtn.click();
    await waitLoadPage();
    await eyes.check('functionHelper Window', Target.window().fully());

    const newFeatureBtn = await $('[data-test="newFeatureBtn"]');
    await newFeatureBtn.click();
    await waitLoadPage();
    await eyes.check('newFeature Window', Target.window().fully());

    // Call Close on eyes to let the server know it should display the results
    await eyes.closeAsync();
  });

  

  afterEach(async () => {
    // If the test was aborted before eyes.close was called, ends the test as aborted.
    await eyes.abortAsync();
  });

  after(async () => {
    const results = await runner.getAllTestResults();
    console.log(results);
  });

});
