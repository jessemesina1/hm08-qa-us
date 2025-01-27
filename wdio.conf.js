exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    headless: true,
    capabilities: [
        /*{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: ['headless', 'disable-gpu']
        }
    },*/
    {
        maxInstances: 5,
        browserName: 'firefox',
        'moz:firefoxOptions': {
            binary: '/Applications/Firefox.app/Contents/MacOS/firefox' // Adjust the path accordingly
        },
        acceptInsecureCerts: true,
        port: 4445
}],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://cnt-67892fbb-b588-434c-92e5-63604e5909f2.containerhub.tripleten-services.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        //'chromedriver', 
        'geckodriver', 
        'intercept', 
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}