const GDD = require("../dist");

describe("Tests focused on the setting of parameters", () => {
  it("should throw an error if min_temperature is not a number", () => {
    const gdd = new GDD();

    expect((gdd) => {
      gdd.min_temperature = "10";
    }).toThrow();

    expect((gdd) => {
      gdd.min_temperature = null;
    }).toThrow();
  });

  it("should throw an error if max_temperature is not a number", () => {
    const gdd = new GDD();

    expect((gdd) => {
      gdd.max_temperature = "10";
    }).toThrow();

    expect((gdd) => {
      gdd.max_temperature = null;
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
