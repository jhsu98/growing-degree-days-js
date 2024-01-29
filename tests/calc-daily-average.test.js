const GDD = require("../dest");

describe("Tests focused on the calcDailyAverage method", () => {
  it("should properly calculate GDD using the Daily Average method", () => {
    const gdd = new GDD();

    gdd.low_temperature = 10;
    gdd.high_temperature = 20;
    gdd.threshold_low = 15;

    expect(gdd.calcDailyAverage()).toBe(0);

    gdd.threshold_low = 20;

    expect(gdd.calcDailyAverage()).toBe(0);

    gdd.threshold_low = 12;

    expect(gdd.calcDailyAverage()).toBe(3);
  });
});
