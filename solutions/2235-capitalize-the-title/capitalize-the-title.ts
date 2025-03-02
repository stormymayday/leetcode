function capitalizeTitle(title: string): string {
    // splitting string by spaces
    const arr = title.split(" ");

    const capitalizedArray = [];

    for(const word of arr) {

        if(word.length > 2) {
            // capitalize words that are longer that 2 chars
            const capitalizedWord = word[0].toUpperCase() + word.slice(1).toLowerCase();
            capitalizedArray.push(capitalizedWord);

        } else if(word.length > 0 && word.length <= 2) {
            // lowercase the word with 1 or 2 letters
            capitalizedArray.push(word.toLowerCase());
        } else {
            // push empty strings
            capitalizedArray.push("");
        }

    }

    // joining array by spaces
    return capitalizedArray.join(" ");
    
};