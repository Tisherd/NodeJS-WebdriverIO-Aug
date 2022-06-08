const Button = require("../../framework/elements/button");
const Label = require("../../framework/elements/label");
const WebTable = require("../../framework/elements/webTable");
const BaseForm = require("../../framework/forms/baseForm");

class ProjectPage extends BaseForm {
    static #pageElement = "//table[@id='allTests']";
    #testsTable = new WebTable("//table[@class='table']/tbody", "Tests table");
    #toHomePageButton = new Button("//ol[@class='breadcrumb']//a", "Home button");
    #projectTestById(testId) {
        return new Label(
            `//table[@class='table']//a[contains(@href,'testInfo?testId=${testId}')]`,
            `Project test - ${testId}`);
    }

    constructor() {
        super(ProjectPage.#pageElement, 'ProjectPage');
    }

    async getTestsTableData() {
        return this.#testsTable.getTableData();
    }

    async clickToHomePageButton() {
        return this.#toHomePageButton.click();
    }

    async isPresentProjectTest(testId) {
        return this.#projectTestById(testId).isElementPresent();
    }
}

module.exports = new ProjectPage();
