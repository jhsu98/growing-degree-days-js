const GDD = require("../dist");

describe("Tests focused on the calcBaskervilleEmin method", () => {
  it("should properly calculate GDD using the Baskerville-Emin method", () => {
    const gdd = new GDD();

    gdd.low_temperature = 34;
    gdd.high_temperature = 60;
    gdd.threshold_low = 50;

    expect(gdd.calcBaskervilleEmin()).toBe(2.750864705556612);
  });
});
