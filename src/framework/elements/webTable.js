const BaseElement = require("./baseElement");
const Logger = require("../utils/logger/logger");

class WebTable extends BaseElement {
    #rowTag;
    #cellTag;
    #headerTag;

    constructor(locator, name, rowTag = 'tr', cellTag = 'td', headerTag = 'th') {
        super(locator, name);
        this.#rowTag = rowTag;
        this.#cellTag = cellTag;
        this.#headerTag = headerTag;
    }

    async getRowCount() {
        const elem = await this.getElement();
        Logger.info(`${this.getName()} Get rows count`)
        return (await elem.$$(this.#rowTag)).length - 1;
    }

    async getColumnCount() {
        const elem = await this.getElement();
        return (await elem.$$(this.#headerTag)).length;
    }

    async getTableData() {
        const elem = await this.getElement();
        const tableData = [];
        const rows = await elem.$$(this.#rowTag);
        for (const row of rows) {
            const rowData = [];
            const cells = await row.$$(this.#cellTag);
            if (cells.length) {
                for (const cell of cells) {
                    rowData.push(await cell.getText());
                }
                tableData.push(rowData);
            }            
        }
        return tableData;
    }
}

module.exports = WebTable;
