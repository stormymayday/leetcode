/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {

    // Primitives (base case)
    if(typeof obj !== 'object' || obj == null) {
        return obj;
    }

    if(Array.isArray(obj)) {
        const compactArray = [];
        for(const element of obj) {
            const compactElement = compactObject(element);
            if(compactElement) {
                compactArray.push(compactElement);
            }
        }
        return compactArray;
    }

    const compactObj = Object.create(null);
    for(const key in obj) {
        const compactEntry = compactObject(obj[key]);
        if(compactEntry) {
            compactObj[key] = compactEntry;
        }
    }
    return compactObj;
    
};