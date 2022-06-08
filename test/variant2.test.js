require('../src/framework/test/baseTest');
const { assert } = require('chai');
const Browser = require('../src/framework/browser/browser');
const Cookies = require('../src/framework/utils/browserUtils/cookies');
const WindowHandles = require('../src/framework/utils/browserUtils/windowHandles');
const StringUtils = require('../src/framework/utils/stringUtils/stringUtils');

const projectApi = require('../src/project/api/projectApi');
const addProjectPage = require('../src/project/pageObjects/addProjectPage');
const homePage = require('../src/project/pageObjects/homePage');
const projectPage = require('../src/project/pageObjects/projectPage');
const testData = require('../src/project/resourses/testData/testData');
const ProjectUtils = require('../src/project/utils/projectUtils');


describe('Smart VK API test', async () => {
    it('Main scenario', async () => {

        //---------------step1-------------------

        const tokenResponse = await projectApi.getToken(testData.variant);
        assert.exists(tokenResponse.data, "Token isn't generated");
        console.log(tokenResponse.data)

        //---------------step2-------------------

        await homePage.open(testData.domain, testData.login, testData.password);
        await Cookies.set([
            { name: testData.cookieName, value: tokenResponse.data },
        ]);
        assert.isTrue(await homePage.isPageOpen(), "HomePage isn't open");
        await Browser.refresh();
        const versionNum = StringUtils.removeCharsExceptNum(await homePage.getVersionText());
        assert.equal(testData.variant, versionNum, "Version and variant aren't same");

        //---------------step3-------------------

        // await homePage.clickToProjectButton(testData.projectName);
        // assert.isTrue(await projectPage.isPageOpen(), "ProjectPage isn't open");
        // const testsTable = await projectPage.getTestsTableData();

        // const dateStartStringList = ProjectUtils.getInternalParameterListByIndex(testsTable, testData.startIndex);
        // const dateList = ProjectUtils.elemListToDateList(dateStartStringList);
        // const reverseSorting = true;
        // const isSortedDateList = ProjectUtils.isSorted(dateList, reverseSorting);
        // assert.isTrue(isSortedDateList, "Tests aren't sorted on page");

        // const getJsonRes = await projectApi.getJson(testData.projectId);
        // const tableObjectsList = ProjectUtils.tableListToObject(testsTable);
        // const getJsonResAsObject = ProjectUtils.responseToObject(getJsonRes.data);

        // for (const test of tableObjectsList) {
        //     assert.deepInclude(getJsonResAsObject, test, "Tests from api don't include tests from ui");
        // }

        //---------------step4-------------------

        await projectPage.clickToHomePageButton();
        assert.isTrue(await homePage.isPageOpen(), "HomePage isn't open");
        await homePage.clickAddProjectButton();
        const mainWindowHandle = await WindowHandles.getCurrent();
        const newWindowHandle = await WindowHandles.getNewHandle();
        await WindowHandles.switchToNew();
        //assert.isTrue(await addProjectPage.isPageOpen(), "AddProjectPage isn't open");
        //await addProjectPage.setProjectName(testData.newProjectName);
        //await addProjectPage.clickSaveProjectButton();
        //assert.isTrue(await addProjectPage.isPresentSuccessMessage(), "No success message");

        await browser.executeAsync('window.close()');
        await WindowHandles.switchTo(mainWindowHandle);

        assert.isFalse(await WindowHandles.isWindowOpen(newWindowHandle), "Adding project window isn't closed");
        assert.isTrue(await homePage.isPageOpen(), "HomePage isn't open");
        await Browser.refresh();
        assert.isTrue(await homePage.isPresentToProjectButton(testData.newProjectName), "The project isn't in the list");

        //---------------step5-------------------

        await homePage.clickToProjectButton(testData.newProjectName);
        assert.isTrue(await projectPage.isPageOpen(), "ProjectPage isn't open");
        const response = await projectApi.putTest(testData.addTestData);
        console.log(response.data)
        await Browser.saveScreenshot('scrsht.png');
        //await browser.pause('10000');
        await projectApi.putTestLog(response.data);
        await projectApi.putTestAttachment(response.data);


        await browser.pause('5000');
    });
});