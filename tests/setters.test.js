const GDD = require("../dist");

describe("Tests focused on the setting of parameters", () => {
  it("should throw an error if min_temp is not a number", () => {
    const gdd = new GDD();

    expect((gdd) => {
      gdd.min_temp = "10";
    }).toThrow();

    expect((gdd) => {
      gdd.min_temp = null;
    }).toThrow();
  });

  it("should throw an error if max_temp is not a number", () => {
    const gdd = new GDD();

    expect((gdd) => {
      gdd.max_temp = "10";
    }).toThrow();

    expect((gdd) => {
      gdd.max_temp = null;
    }).toThrow();
  });

  it("should throw an error if threshold_low is not a number", () => {
    const gdd = new GDD();

    expect((gdd) => {
      gdd.threshold_low = "10";
    }).toThrow();

    expect((gdd) => {
      gdd.threshold_low = null;
    }).toThrow();
  });

  it("should throw an error if threshold_high is not a number", () => {
    const gdd = new GDD();

    expect((gdd) => {
      gdd.threshold_high = "10";
    }).toThrow();

    expect((gdd) => {
      gdd.threshold_high = null;
    }).toThrow();
  });
});
