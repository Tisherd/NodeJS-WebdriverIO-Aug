const Requests = require("../../framework/utils/api/requests");
const apiConfig = require('../resourses/configData/api.config');

const FormData = require('form-data');
const fs = require('fs/promises');
const ar = require('fs')
const FormDataUtils = require("../../framework/utils/formDataUtils/formDataUtils");
const imageToBase64 = require('image-to-base64');

const Jimp = require("jimp");
const gm = require('gm');

const pngToJpeg = require('png-to-jpeg');
class ProjectApi {
    async getToken(variant) {
        const url = apiConfig.baseUrl + apiConfig.urlEnd.getToken;
        return Requests.post(url, {
            params: {
                variant: variant
            }
        });
    }

    async getJson(projectId) {
        const url = apiConfig.baseUrl + apiConfig.urlEnd.getJson;
        return Requests.post(url, {
            params: {
                projectId: projectId
            }
        });
    }

    async putTest(params) {
        const url = apiConfig.baseUrl + apiConfig.urlEnd.putTest;
        return Requests.post(url, {
            params: {
                SID: params.sid,
                projectName: params.projectName,
                testName: params.testName,
                methodName: params.methodName,
                env: params.env
            }
        });
    }

    async putTestAttachment(testId, content, contentType) {
        const url = apiConfig.baseUrl + apiConfig.urlEnd.putTestAttachment;
        let data = 'iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAA' +
            'CA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0' +
            'YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly' +
            '93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAg' +
            'ICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZm' +
            'Y6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAADuUlEQVQ4EbVU' +
            'TUtcZxR+7ufkXp1SZ4iZRE1EDVQRnTAhowsZMFm40I2rNqUIIev8hvoPQroQXBTqwiAWcd0EglEhiZNajVZrQGXAWAzaZpzMnZn7lXPeeIe5Da' +
            'Wb9Ax33vOec8/znI/3vVI6nfbxP4v8b/iSJIGfzyGfkPi+D13XUalUBL6qqmIvy5+8WuX/r2RCkUzAoIuLi2hqaoLrutjb28P6+josyxJkiqJA' +
            '07SQXiqVwHaOZYx/itLc3Px9YIxEIlheXsbExATGxsYwMjIiwEdHRwXA/Pw8EokEcrkcDg4OYJomVlZWMDU1JSqfmZlBR0cHbNsOtVoNCHjlTF' +
            'iSySQMwxAVxONxQbi0tIRMJoPe3l5MT0+jtbUVg4ODYGImY18qlcL4+DhisZjoggCjv1C7uOyenh7Mzs5iY2ND6FQpdnd3sba2JloSjUYxPDyM' +
            '/v5+TE5OYn9/X9jZtrOzg+3t7WqyAUmoEu419/+HBw9E+eVymbJqAJP39fWBCR3HEU+hUMDQ0JCYGc8um81iYGAAjY2N8DwvwBdraCY8tHhDA1' +
            'Y3N9Hd3S2yvH37O7RcbsF7AuUsD9+8wdOFBTx/8QJtbW1C5/nMzc3R0D2UyxXk83lRXcAk1V5GCT5sSUGDbeHxy9/EO98M9OOXzT9wfHISxKC1' +
            'vR0GHfOtrS2g/SouWwU0Xkggu7qO9PUkJFULnbIQyTm6ewu2hF+vnOIIUQwdGlg8f4QF6wvMWBq+pAkaskSnx4FFVUf0CNpcC797KizXQ4oAHh' +
            'VdXJJ81F7j6kwUynPHlXDPdFB2fRj+KVK0KvT2rbp3uKYryJU11Cke8qqMuOoioeeJ1MPDYxM36m1cNSq4GdFx58RAWvbx8TrXnK4IgR16Em5G' +
            'K4iqHi5GHHxLgcSDn97WgZPoND+GGZRpPYH85cgiiRQl1ltXxmFFQ5PuopP8TrW5ZyRcWp7AbmkeZefg5+N6PPnbRJdpw/YlfB0vQiPQZwVdZN' +
            'tFZEVK6D1VTnccJlXzuqTjvOZiq6Rhj2KqLSJsofOHgIl8+t0/qsfDioxmSUWGjrRFzhYi/5Oynrdl3KXHIZDXtF6hil8R6I9FBV/RvDLnXKxS' +
            'bAdVYhNeINXBMwmXWCTQGG2Y+Jj+dFrfEmiMAtmeowpo9ojTvkD+A/L1UJUMmiVfkuz6WTyZhFRJAgP33j3bsM5k/Fng68UP21hYJyyxZwLWuS' +
            '2cKMfUSm3rhD0g4E2g197fwMZ+Bgt8rNe2iP2BhL5dgfFzrx8AfECEDdx45a0AAAAASUVORK5CYII='



        Jimp.read("scrsht.png", function (err, image) {
            if (err) {

                // Return if any error
                console.log(err);
                return;
            }

            // Convert image to JPG and store it to 
            // './output/' folder with 'out.jpg' name
            image.write("scrsht.jpg");
        });

        await browser.pause('2000');

        gm("scrsht.png").compress('JPEG').autoOrient().write('scrsht2.png', function (err) {
            if (!err) console.log(' hooray! ');
        });

        gm('scrsht.jpg')
            .resize(192, 108)
            .autoOrient()
            .write('scrsht.jpg', function (err) {
                if (!err) console.log(' hooray! ');
            });

        await browser.pause('2000');

        const base644 = await imageToBase64('scrsht.jpg')

        // //await fs.writeFile('sond.png', filePart);
        // //const buffer = Buffer.from(filePart, "base64");
        // let buff = ar.readFileSync('sds.png');
        // //let base64data = buff.toString('base64');
        // //const full = "data:image/gif;base64," + filePart.toString();
        // //let buff = new Buffer.from(file);
        // let base64data = buff.toString('binary');

        // let buffer2 = await fs.readFile("scrsht.png");
        // pngToJpeg({ quality: 30 })(buffer2)
        //     .then(output => ar.writeFileSync("scr.jpeg", output));
        //const filePart = await fs.readFile('scr.jpeg', 'base64');

        // const formData = new FormData();
        // formData.append('s', base644)

        //console.log(base644);
        console.log(data.length)
        console.log(base644.length);
        return Requests.post(url, {
            params: {
                testId: testId,
                content: base644,
                contentType: "image/png",
                'Content-Type': "image/png"
            },
            headers: {
                'content-type': 'image/png'
            }
        });
    }

    async putTestLog(testId, content) {
        const url = apiConfig.baseUrl + apiConfig.urlEnd.putTestLog;
        const file = await fs.readFile('combined.log');
        return Requests.post(url, {
            params: {
                testId: testId,
                content: file.toString().replace(/\r?\n|\r/g, '')
            }
        });
    }

    base64_encode(file) {
        // read binary data
        const bitmap = ar.readFileSync(file);
        // convert binary data to base64 encoded string
        return bitmap.toString('base64');
    }
}

module.exports = new ProjectApi();
