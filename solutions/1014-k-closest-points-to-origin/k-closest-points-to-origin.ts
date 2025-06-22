function kClosest(points: number[][], k: number): number[][] {
    points.sort((a, b) => {
        // return Math.sqrt((a[0]**2 + a[1]**2)) - Math.sqrt((b[0]**2 + b[1]**2));
        return (a[0]**2 + a[1]**2) - (b[0]**2 + b[1]**2);
    });
    return points.slice(0, k);
};