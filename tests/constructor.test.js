const GDD = require("../dist");

describe("Tests focused on the construction of a new GDD object", () => {
  it("should create an instance of GDD", () => {
    const gdd = new GDD();
    expect(gdd).toBeInstanceOf(GDD);
  });

  it("should not throw an error with an empty constructor", () => {
    expect(() => {
      const gdd = new GDD();
    }).not.toThrow();
  });

  it("should not throw an error with different combinations of valid parameters", () => {
    const parameters = {
      low_temperature: 10,
      high_temperature: 20,
      threshold_low: 5,
      // threshold_high: 30,
    };

    // loop through every combination of keys in parameters including the empty set
    function getPowerSet(arr) {
      const powerSet = [];
      const totalSets = Math.pow(2, arr.length);

      for (let i = 0; i < totalSets; i++) {
        const subset = [];
        for (let j = 0; j < arr.length; j++) {
          if (i & Math.pow(2, j)) {
            subset.push(arr[j]);
          }
        }
        powerSet.push(subset);
      }

      return powerSet;
    }

    const powerSet = getPowerSet(Object.keys(parameters));
    for (const keys of powerSet) {
      let params = {};
      for (const k of keys) {
        params[k] = parameters[k];
      }

      expect((params) => {
        const gdd = new GDD(params);
      }).not.toThrow();
    }
  });
});
