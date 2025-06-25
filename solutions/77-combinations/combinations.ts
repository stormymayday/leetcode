function combine(n: number, k: number, start: number = 1): number[][] {
    if(k === 0) {
        return [[]];
    }
    if(k > n) {
        return [];
    }

    const first = start;
    const partialCombos = combine(n - 1, k - 1, start + 1);
    const combosWithFirst = [];
    for(const partialCombo of partialCombos) {
        combosWithFirst.push([first, ...partialCombo]);
    }

    const combosWithoutFirst = combine(n - 1, k, start + 1);

    return [...combosWithFirst, ...combosWithoutFirst];

};