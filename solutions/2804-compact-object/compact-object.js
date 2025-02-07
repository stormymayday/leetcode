/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {

    // The base case (handling primitives)
    if(typeof obj !== 'object' || obj == null) {
        return obj;
    }
    
    // Arrays
    if(Array.isArray(obj)) {
        const compactArray = [];
        for(const element of obj) {
            // Recursion
            const compactElement = compactObject(element);
            // THIS IS WHERE THE CHECK HAPPENS
            if(compactElement) {
                compactArray.push(compactElement);
            }
        }
        // Recursion ENDS
        return compactArray;
    }

    // Objects
    const compactObj = {};
    for(const key in obj) {
        // Recursion
        const compactEntry = compactObject(obj[key]);
        // THIS IS WHERE THE CHECK HAPPENS
        if(compactEntry) {
            compactObj[key] = compactEntry;
        }
    }
    // Recursion ENDS
    return compactObj;
};