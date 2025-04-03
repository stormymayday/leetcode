function minRemoveToMakeValid(s: string): string {

  const arr = s.split("");
  const stack = [];

  for(let i = 0; i < arr.length; i++) {

    const currentChar = arr[i];

    if(currentChar === "(")  {
        stack.push(i);
    } else if(stack.length === 0 && currentChar === ")")  {
        arr[i] = "";
    } else if(stack.length > 0 && currentChar === ")")  {
        stack.pop();
    }

  }

    let n = stack.length
    while(n > 0) {
        const index = stack.pop();
        arr[index] = "";
        n--;
    }

    return arr.join("");

};