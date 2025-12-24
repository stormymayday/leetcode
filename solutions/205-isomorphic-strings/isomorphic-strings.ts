function isIsomorphic(s: string, t: string): boolean {

    const n = s.length;

    const sToM = new Map<string, string>();
    const tToM = new Map<string, string>();

    for (let i = 0; i < n; i += 1) {

        const charS = s[i];
        const charT = t[i];

        if (sToM.has(charS) && sToM.get(charS) !== charT) {
            return false;
        }

        sToM.set(charS, charT);

        if (tToM.has(charT) && tToM.get(charT) !== charS) {
            return false;
        }

        tToM.set(charT, charS);

    }

    return true;
};