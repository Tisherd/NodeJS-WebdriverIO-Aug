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

}

module.exports = ProjectUtils;