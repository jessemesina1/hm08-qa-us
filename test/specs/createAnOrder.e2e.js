const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

    it('should set the address', async () => {
        await browser.url('/') 
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St'); 
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601'); 
        await expect($(page.toField)).toHaveValue('1300 1st St');
        
    })

    it('should select Supportive option', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportiveTariff = await page.selectSupportiveOption();
        await expect(supportiveTariff.parentElement()).toHaveElementClass('active');

    })

    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
    }) 

    it('should wait for driver', async () => {
        // call taxi to address
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    })
    it('should add a credit card', async () => {
        // Adding a credit card
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addPaymentMethodCard(); 
        const cardPaymentMethodIcon = await $(page.cardPaymentMethodIcon);
        await cardPaymentMethodIcon.waitForDisplayed();
        await expect(await $(cardPaymentMethodIcon)).toBeExisting();

})

    it('should send a message to the driver', async () => {
        await browser.url('/')
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addMessageToTheDriver('Get some whiskey');
        await expect($(page.messageButton)).toHaveValue('Get some whiskey');
    })

    it('should order a blanket and handkerchiefs', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportiveOption();
        await page.orderingABlanketAndHandkerchiefs();
        await expect($(page.blanketAndHandkerchiefs)).toBeChecked();

    })

    it('should order 2 ice creams', async () =>{
        await browser.url('/');
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportiveOption();
        await page.orderIceCreams();
        const iceCreamValue = 2;
        await expect($(`div=${iceCreamValue}`)).toBeExisting();

    })


        it('should show the car search modal', async () => {
            await browser.url('/');
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.selectSupportiveOption();
            let countryCode = '+1';
            let phoneNumber = helper.getPhoneNumber(countryCode);
            await page.submitPhoneNumber(phoneNumber);
            const actualMessage = 'Test message.';
            await page.addMessageToTheDriver(actualMessage);
            //await page.showCarSearchModal();
            const orderCarButton = await $(page.orderCarButton);
            await orderCarButton.waitForDisplayed();
            await orderCarButton.click();
            const carSearchModal = await $(page.carSearchModal);
            await expect(carSearchModal).toBeDisplayed();
        })    
        //await browser.pause(2000);

       // input phone number
    it ('should fill phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting(); 
    })
})

