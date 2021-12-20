export function getStar(stars) {
    var totalStar = 0, sum = 0;
    var i = 1;
    for (star in stars) {
        totalStar += i * star;
        sum += 1 * star;
        i++;
    }
    return Math.floor((totalStar / sum) * 10) / 10;
}