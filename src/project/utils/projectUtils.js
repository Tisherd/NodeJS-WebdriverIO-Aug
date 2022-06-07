const convert = require('xml-js');

class ProjectUtils {
    static isSorted(list, reverse = false) {
        let comparisonFunction;
        if (reverse) {
            comparisonFunction = function (a, b) {
                return a <= b;
            }
        }
        else {
            comparisonFunction = function (a, b) {
                return a >= b;
            }
        }

        let flag = true;
        for (const [key, listElem] of list.entries()) {
            if (key) {
                const previosListElem = list[key - 1];
                if (!comparisonFunction(listElem, previosListElem)) {
                    flag = false;
                }
            }
        }
        return flag;
    }

    static getInternalParameterListByIndex(list, index) {
        const resultList = [];
        for (const listElem of list) {
            resultList.push(listElem[index]);
        }
        return resultList;
    }

    static elemListToDateList(list) {
        const dateList = [];
        for (const listElem of list) {
            dateList.push(new Date(listElem));
        }
        return dateList;
    }

    static tableListToObject(list) {
        const resultList = [];
        for (const listElem of list) {
            const collector = {};
            collector.duration = listElem[5];
            collector.method = listElem[1];
            collector.name = listElem[0];
            collector.startTime = listElem[3];
            if (listElem[4].length != 0) {
                collector.endTime = listElem[4];
                collector.status = listElem[2].toUpperCase();
            }
            else {
                collector.status = listElem[2];
            }

            resultList.push(collector);
        }
        return resultList;
    }

    static responseToObject(resData) {
        if (typeof resData == "string") {
            if (resData.indexOf('<test>') != -1) {
                const resultList = [];
                const xmlShell = '<t>' + resData + '</t>';
                const xmlObject = convert.xml2js(xmlShell, { compact: true, spaces: 4 });
                for (const test of xmlObject.t.test) {
                    const collector = {};
                    collector.name = test.name._text;
                    collector.method = test.method._text;
                    collector.status = test.status._text;
                    collector.startTime = test.startTime._text;
                    if (test.endTime) {
                        collector.endTime = test.endTime._text;
                    }
                    collector.duration = test.duration._text;
                    resultList.push(collector);
                }
                return resultList;
            }
            else {
                const resultList = [];
                const rows = resData.split('\n');
                for (const row of rows) {
                    const collector = {};
                    const cells = row.split(',');
                    collector.name = cells[0];
                    collector.method = cells[1];
                    collector.status = cells[2];
                    collector.startTime = cells[3];
                    if (cells[4] != 'null') {
                        collector.endTime = cells[4];
                    }
                    collector.duration = cells[5];
                    resultList.push(collector);
                }
                return resultList;
            }
        }
        else {
            return resData;
        }
    }
}

module.exports = ProjectUtils;
