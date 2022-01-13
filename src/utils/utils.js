export function getStar(stars) {
    if (stars && stars.length === 5) {
        var totalStar = 0, sum = 0;
        var i = 1;
        for (var star of stars) {
            totalStar += i * star;
            sum += 1 * star;
            i++;
        }
        if (sum === 0) return 0;
        return Math.floor((totalStar / sum) * 10) / 10;
    }
    return 0;

}

export function sortTourDate(tour) {
    return {
        ...tour,
        tour: tour.tour.sort((a, b) => a.date > b.date)
    }
}