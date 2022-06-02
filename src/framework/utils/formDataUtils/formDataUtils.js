const fs = require('fs/promises');
const FormData = require('form-data');

class FormDataUtils {
    static async createFormDate(fileType, path, fileName) {
        const form = new FormData();
        const image = await fs.readFile(path + fileName);
        form.append(fileType, image, fileName);
        return form;
    }

}

module.exports = FormDataUtils;
