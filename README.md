Sprint 8 Project: Test Automation

This project allowed us to test multiple functions of an app through pre-written code.  These test were triggered consecutively once the command was sent.  

The technologies we used to conduct these tests were:
- Mozilla Firefox version Firefox 131.0.3
- Visual Studio Code 2
- GitHub

In order to write the test, we created a file to contain inputs, buttons, modals and functions (page.js).  In order to obtain these, we would utilize DevTools in order to find the correct selectors and elements of the modals, buttons.  Once we had those, we could write the function to identify the action once they were called.  

Once the functions were identified in page.js, we could write the tests in createAnOrder.e2e.js.  When writing the tests, we would first need to call the browser url, followed by the fillAddress function, the respective test function (i.e. add credit card), followed by the expected result.  

The tests would be run using the command "npm run wdio"