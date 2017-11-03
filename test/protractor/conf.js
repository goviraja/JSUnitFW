/**
 * Created by Govi Rajagopal on 10/23/2017
 * 
 */

/*
 Commands to set up Protractor in your env :
 1) npm install -g protractor
 2) webdriver-manager update
 3) webdriver-manager start
 4) protractor ./test/protractor/conf.js
 */
'use strict'

var HtmlReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlReporter({
    dest: './test/protractor/screenshots',
    filename: 'html-report.html',
    reportTitle: "SmartShip :Dev Test Results"
});

exports.config = {
    framework: 'jasmine2',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 120000,
        isVerbose: true,
        includeStackTrace: true
    },
    // How long to wait for a page to load.
    getPageTimeout: 60000,

    // Webdriver Time outs 
    allScriptsTimeout: 120000,

    seleniumAddress: 'http://localhost:4444/wd/hub',

    // choose which tests to run from command line using suites (full suite runs them all)
    // protractor ./test/protractor/conf.js --suite=test

    suites: {
        test: 'ss-spec.js',
        ssgloballogin: 'ssgloballogin.js',
        full: '*.js'
    },

    // Add your target scripts in here ...
    specs: ['ss-spec.js'],

    capabilities: {
        'browserName': 'chrome'
    },

    
     // Support for running against multiple browsers 
    /** multiCapabilities: [{
     'browserName': 'firefox'
     }, {
     'browserName': 'chrome'
     }],
    */

    beforeLaunch: function () {
        return new Promise(function (resolve) {
            reporter.beforeLaunch(resolve);
        });
    },

    // Assign the test reporter to each running instance
    onPrepare: function () {
        jasmine.getEnv().addReporter(reporter);
        browser.driver.manage().window().setSize(1600, 800);
    },

    // Close the report after all tests finish
    afterLaunch: function (exitCode) {
        return new Promise(function (resolve) {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};