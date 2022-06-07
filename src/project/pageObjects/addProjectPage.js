const Button = require("../../framework/elements/button");
const Label = require("../../framework/elements/label");
const Textarea = require("../../framework/elements/textarea");
const BaseForm = require("../../framework/forms/baseForm");

class AddProjectPage extends BaseForm {
    static #pageElement = "//form[@id='addProjectForm']";
    #projectNameArea = new Textarea("//input[@id='projectName']", "Project name area");
    #saveProjectButton = new Button("//button[@type='submit']", "Save project button");
    #successMessage = new Label("//div[contains(@class,'alert-success') and contains(text(),'saved')]", "Success message")

    constructor() {
        super(AddProjectPage.#pageElement, 'AddProjectPage');
    }

    async setProjectName(name) {
        return this.#projectNameArea.setValue(name);
    }

    async clickSaveProjectButton() {
        return this.#saveProjectButton.click();
    }

    async isPresentSuccessMessage() {
        return this.#successMessage.isElementPresent();
    }
}

module.exports = new AddProjectPage();
