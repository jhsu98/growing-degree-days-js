const GDD = require("../dist");

describe("Tests focused on the calcBaskervilleEmin method", () => {
  it("should properly calculate GDD using the Baskerville-Emin method", () => {
    const gdd = new GDD();

    gdd.min_temp = 34;
    gdd.max_temp = 60;
    gdd.threshold_low = 50;

    expect(gdd.calcBaskervilleEmin().toFixed(3)).toBe("2.749");
  });
});
