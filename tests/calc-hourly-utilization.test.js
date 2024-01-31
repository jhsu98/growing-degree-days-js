const GDD = require("../dist");

describe("Tests focused on the calcHourlyUtilization method", () => {
  it("should properly calculate GDD using the Hourly Utilization method", () => {
    const gdd = new GDD();

    gdd.threshold_low = 34;
    gdd.hourly_temps = [32, 36, 51, 60, 74, 75, 70, 66, 63, 61];
    gdd.min_temp_cutoff = 40;
    gdd.max_temp_cutoff = 66;

    expect(gdd.calcHourlyUtilization()).toBe(25);
  });

  it("should properly calculate GDD using the Hourly Utilization method", () => {
    const gdd = new GDD();

    gdd.threshold_low = 34;
    gdd.hourly_temps = [32, 36, 51, 60, 74, 75, 70, 66, 63, 61];
    gdd.min_temp_cutoff = 40;
    gdd.max_temp_cutoff = 66;

    expect(gdd.calcHourlyUtilization({ cutoff_min_temp: true })).toBe(26);
  });

  it("should properly calculate GDD using the Hourly Utilization method", () => {
    const gdd = new GDD();

    gdd.threshold_low = 34;
    gdd.hourly_temps = [32, 36, 51, 60, 74, 75, 70, 66, 63, 61];
    gdd.min_temp_cutoff = 40;
    gdd.max_temp_cutoff = 66;

    expect(gdd.calcHourlyUtilization({ cutoff_max_temp: true })).toBe(22.9);
  });

  it("should properly calculate GDD using the Hourly Utilization method", () => {
    const gdd = new GDD();

    gdd.threshold_low = 34;
    gdd.hourly_temps = [32, 36, 51, 60, 74, 75, 70, 66, 63, 61];
    gdd.min_temp_cutoff = 40;
    gdd.max_temp_cutoff = 66;

    expect(gdd.calcHourlyUtilization({ cutoff_min_temp: true, cutoff_max_temp: true })).toBe(23.9);
  });
});
