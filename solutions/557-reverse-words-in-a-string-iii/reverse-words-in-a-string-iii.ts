function reverseWords(s: string): string {
    
    const arr: string[] = s.split(" ");

    for(let i = 0; i < arr.length; i += 1) {

        if(arr[i] !== "") {

            const reverse: string[] = [];

            for(let j = arr[i].length - 1; j >= 0; j -= 1) {

                reverse.push(arr[i][j]);

            }

            arr[i] = reverse.join("");

        }

    }

    return arr.join(" ");

};