const GDD = require("../dist");

describe("Tests focused on the setting of parameters", () => {
  it("should throw an error if low_temperature is not a number", () => {
    const gdd = new GDD();

    expect((gdd) => {
      gdd.low_temperature = "10";
    }).toThrow();

    expect((gdd) => {
      gdd.low_temperature = null;
    }).toThrow();
  });

  it("should throw an error if high_temperature is not a number", () => {
    const gdd = new GDD();

    expect((gdd) => {
      gdd.high_temperature = "10";
    }).toThrow();

    expect((gdd) => {
      gdd.high_temperature = null;
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
