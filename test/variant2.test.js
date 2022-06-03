require('../src/framework/test/baseTest');
const { assert } = require('chai');
const Browser = require('../src/framework/browser/browser');

const projectApi = require('../src/project/api/projectApi');
const testData = require('../src/project/resourses/testData/testData');


describe('Smart VK API test', async () => {
    it('Main scenario', async () => {
        const response = await projectApi.getToken(testData.variant);
        console.log(response.data);
        await Browser.open('localhost:8080/web');
        //await browser.pause(30000);
        await Browser.setCookies([
            {name: 'token', value: response.data},
        ])
        await browser.pause('1000');
        await browser.refresh();
        await browser.pause('5000');
        //await browser.pause('10000');
    
        const allCookies = await browser.getCookies();
        console.log(allCookies);
        
    });
});