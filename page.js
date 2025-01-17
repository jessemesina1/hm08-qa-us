module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumber: '#number',
    cardCode: '.card-second-row #code',
    messageButton: '#comment',
    blanketAndHandkerchiefs: '.switch-input',
    orderingABlanketAndHandkerchiefsSelector: '.switch',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    paymentMethodButton: '.pp-text',
    addCardButton: 'div=Add card',
    linkCardButton: 'button=Link',
    closePaymentMethodModalButton: '.payment-picker .close-button',
    supportiveButton: 'div=Supportive',
    iceCreamCounterPlusButton: 'div.counter-plus',
    orderCarButton: '.smart-button',
    // Modals
    phoneNumberModal: '.modal',
    carSearchModal: 'div=Car search',
    // Misc
    cardSignatureStrip: '.plc',
    cardPaymentMethodIcon: 'img[alt="card"]',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },

    selectSupportiveOption: async function() {
        const supportiveButton = await $(this.supportiveButton);
        await supportiveButton.waitForClickable();
        await supportiveButton.click();
        return supportiveButton;

    },

    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },

    addPaymentMethodCard: async function() {
        const paymentMethodButton = await $(this.paymentMethodButton); 
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        
        const cardNumber = await $(this.cardNumber);
        await cardNumber.waitForDisplayed();
        await cardNumber.setValue(1234567891234567);
        
        const cardCode = await $(this.cardCode);
        await cardCode.waitForDisplayed();
        await cardCode.setValue(55);
        
        const cardSignatureStrip = await $(this.cardSignatureStrip);
        await cardSignatureStrip.waitForDisplayed();
        await cardSignatureStrip.click();
        
        const linkCardButton = await $(this.linkCardButton); 
        await linkCardButton.waitForDisplayed();
        await linkCardButton.click();
        
        const closePaymentMethodModalButton = await $(this.closePaymentMethodModalButton);
        await closePaymentMethodModalButton.waitForDisplayed();
        await closePaymentMethodModalButton.click();
    },

    addMessageToTheDriver: async function (message) {
        const messageButton = await $(this.messageButton);
        await messageButton.waitForDisplayed();
        messageButton.setValue(message);

    },

    orderingABlanketAndHandkerchiefs: async function() {
        const orderingABlanketAndHandkerchiefsSelector = await $(this.orderingABlanketAndHandkerchiefsSelector);
        await orderingABlanketAndHandkerchiefsSelector.waitForDisplayed();
        await orderingABlanketAndHandkerchiefsSelector.click();
    },

    orderIceCreams: async function () {
        const iceCreamCounterPlusButton = await $(this.iceCreamCounterPlusButton);
        await iceCreamCounterPlusButton.waitForClickable({ timeout: 30000 });
        await iceCreamCounterPlusButton.click();
        await iceCreamCounterPlusButton.click();
        console.log
    },

    showCarSearchModal: async function() {
        //const ppCloseButton = await $(this.ppCloseButton);
        const orderCarButton = await $(this.orderCarButton);
        const carSearchModal = await $(this.carSearchModal);
    
    },


};