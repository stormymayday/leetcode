function relativeSortArray(arr1: number[], arr2: number[]): number[] {

    const result = [];
    
    const secondHalf = [];

    const hashSet = new Set(arr2);

    const hashMap = {};
    for(let i = 0; i < arr1.length; i++) {

        if(!hashSet.has(arr1[i])) {
            secondHalf.push(arr1[i]);
            continue;
        }

        if(hashMap[arr1[i]] === undefined) {

            hashMap[arr1[i]] = 1;

        } else {

            hashMap[arr1[i]]++;

        }

    }

    secondHalf.sort((a, b) => a - b);

    hashSet.forEach((element) => {

        if(hashMap[element]) {

            while(hashMap[element] > 0) {

                result.push(element);
                
                hashMap[element]--;
           }
            
        }

    });

    return result.concat(secondHalf);

};