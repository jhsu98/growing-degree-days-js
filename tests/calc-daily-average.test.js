const GDD = require("../dist");

describe("Tests focused on the calcDailyAverage method", () => {
  it("should properly calculate GDD using the Daily Average method", () => {
    let gdd = new GDD();

    gdd.min_temp = 10;
    gdd.max_temp = 20;
    gdd.threshold_low = 15;

    expect(gdd.calcDailyAverage()).toBe(0);

    gdd.threshold_low = 20;

    expect(gdd.calcDailyAverage()).toBe(0);

    gdd.threshold_low = 12;

    expect(gdd.calcDailyAverage()).toBe(3);

    gdd = new GDD();

    gdd.min_temp = 34;
    gdd.max_temp = 60;
    gdd.min_temp_cutoff = 35;
    gdd.max_temp_cutoff = 59;
    gdd.threshold_low = 40;

    expect(gdd.calcDailyAverage()).toBe(7);
    expect(gdd.calcDailyAverage({ cutoff_min_temp: true })).toBe(7.5);
    expect(gdd.calcDailyAverage({ cutoff_max_temp: true })).toBe(6.5);
    expect(gdd.calcDailyAverage({ cutoff_min_temp: true, cutoff_max_temp: true })).toBe(7);
  });
});
