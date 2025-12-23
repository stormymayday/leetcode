function reverseWords(s: string): string {
    
    const arr: string[] = s.split(" ");

    for(let i = 0; i < arr.length; i += 1) {

        if(arr[i] !== "") {

            const splitStr = arr[i].split("");

            let left = 0;
            let right = splitStr.length - 1;
            while(left < right) {
                const temp = splitStr[left];
                splitStr[left] = splitStr[right];
                splitStr[right] = temp;
                left += 1;
                right -= 1;
            }

            arr[i] = splitStr.join("");

        }

    }

    return arr.join(" ");

};