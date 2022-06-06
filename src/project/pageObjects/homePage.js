const Button = require("../../framework/elements/button");
const Label = require("../../framework/elements/label");
const BaseForm = require("../../framework/forms/baseForm");


class HomePage extends BaseForm {
    static #pageElement = "//div[@class='panel-heading' and contains(text(), 'Available projects')]";
    #versionText = new Label("//p[contains(@class, 'footer-text')]/span | //p[contains(@class, 'footer-text')]/b", 'Version text');
    #addProjectButton = new Button("//a[@target='_blank']", "Add project button");
    #toProjectButton(projectName){ 
        return new Button(`//a[@class='list-group-item' and contains(text(), '${projectName}')]`, `${projectName} href`);
    }

    constructor(){
        super(HomePage.#pageElement, 'HomePage');
    }

    async getVersionText(){
        return this.#versionText.getText();
    }

    async clickToProjectButton(projectName){
        return this.#toProjectButton(projectName).click();
    }

    async clickAddProjectButton(){
        return this.#addProjectButton.click();
    }

}

module.exports = new HomePage();
