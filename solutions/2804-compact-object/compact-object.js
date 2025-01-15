/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {

    // Base Case - Primitives
    if(typeof obj !== 'object' || obj == null) {
        return obj;
    }

    // Arrays
    if(Array.isArray(obj)) {
        const compactArray = [];
        for(let i = 0; i < obj.length; i++) {
            const compactElement = compactObject(obj[i]);
            if(compactElement) {
                compactArray.push(compactElement);
            }
        }
        return compactArray;
    }

    // Objects
    const compactObj = {};
    for(const key in obj) {
        const compactEntry = compactObject(obj[key]);
        if(compactEntry) {
            compactObj[key] = compactEntry;
        }
    }
    return compactObj;
    
};