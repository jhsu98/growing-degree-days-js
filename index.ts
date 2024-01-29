class GDD {
  /**
   * Private Properties
   */
  #rounding: "floor" | "ceil" | "round" | "none" = "none";
  #decimal_places: number | null = null;

  #low_temperature: number | null = null;
  #high_temperature: number | null = null;
  #threshold_low: number | null = null;
  #threshold_high: number | null = null;

  /**
   * Setters & Getters
   */

  set rounding(value: "floor" | "ceil" | "round" | "none") {
    if (!["floor", "ceil", "round", "none"].includes(value)) throw new TypeError("Invalid rounding option");
    this.#rounding = value;
  }

  set decimal_places(value: number) {
    if (isNaN(value)) throw new TypeError("decimal_places must be a number");
    if (!Number.isInteger(value)) throw new TypeError("Decimal places must be an integer");
    if (value < 0) throw new RangeError("Decimal places cannot be less than 0");
    this.#decimal_places = value;
  }

  set low_temperature(value: number) {
    if (typeof value !== "number") throw new Error("low_temperature must be a number");
    if (this.high_temperature && value > this.high_temperature)
      throw new Error("Low temperature cannot be higher than high temperature");
    this.#low_temperature = value;
  }

  set high_temperature(value: number) {
    if (typeof value !== "number") throw new Error("high_temperature must be a number");
    if (this.low_temperature && value < this.low_temperature)
      throw new Error("High temperature cannot be lower than low temperature");
    this.#high_temperature = value;
  }

  set threshold_low(value: number) {
    if (typeof value !== "number") throw new Error("threshold_low must be a number");
    if (this.threshold_high && value > this.threshold_high)
      throw new Error("Low threshold cannot be higher than high threshold");
    this.#threshold_low = value;
  }

  set threshold_high(value: number) {
    if (typeof value !== "number") throw new Error("threshold_high must be a number");
    if (this.threshold_low && value < this.threshold_low)
      throw new Error("High threshold cannot be lower than low threshold");
    this.#threshold_high = value;
  }

  get low_temperature(): number | null {
    return this.#low_temperature;
  }

  get high_temperature(): number | null {
    return this.#high_temperature;
  }

  get threshold_low(): number | null {
    return this.#threshold_low;
  }

  get threshold_high(): number | null {
    return this.#threshold_high;
  }

  /**
   * Constructor
   */
  constructor(params: any) {
    if (params?.rounding) this.#rounding = params?.rounding;
    if (params?.decimal_places) this.#decimal_places = params?.decimal_places;

    if (params?.low_temperature) {
      this.low_temperature = params?.low_temperature;
    }
    if (params?.high_temperature) {
      this.high_temperature = params.high_temperature;
    }
    if (params?.threshold_low) {
      this.threshold_low = params.threshold_low;
    }
    if (params?.threshold_high) {
      this.threshold_high = params.threshold_high;
    }
  }

  /**
   * Private Methods
   */
  private formatGDD(gdd: number): number {
    switch (this.#rounding) {
      case "floor":
        gdd = Math.floor(gdd);
      case "ceil":
        gdd = Math.ceil(gdd);
      case "round":
        gdd = Math.round(gdd);
    }

    if (typeof this.#decimal_places === "number") {
      gdd = Number(gdd.toFixed(this.#decimal_places));
    }

    return gdd;
  }

  private dailyAverage(low_temperature: number, high_temperature: number, threshold_low: number): number {
    return this.formatGDD(Math.max(0, (low_temperature + high_temperature) / 2 - threshold_low));
  }

  /**
   * Public Methods
   */
  public calcDailyAverage(): number {
    if (!this.low_temperature || !this.high_temperature) {
      throw new Error("Low and high temperatures must be set");
    }

    if (!this.threshold_low) {
      throw new Error("Low threshold must be set");
    }

    const gdd = this.dailyAverage(this.low_temperature, this.high_temperature, this.threshold_low);
    return gdd;
  }

  public calcBaskervilleEmin(): number {
    if (!this.low_temperature) throw new SyntaxError("Parameter is not set: low_temperature");
    if (!this.high_temperature) throw new SyntaxError("Parameter is not set: high_temperature");
    if (!this.threshold_low) throw new SyntaxError("Parameter is not set: threshold_low");

    const min = this.low_temperature;
    const max = this.high_temperature;
    const base = this.threshold_low;

    if (max < base) {
      return 0;
    }

    if (min >= base) {
      return this.dailyAverage(min, max, base);
    }

    const average = (max + min) / 2;
    const w = (max - min) / 2;
    const arcsin = Math.asin((base - average) / w);

    const gdd = (w * Math.cos(arcsin) - (base - average) * (3.14 / 2 - arcsin)) / 3.14;
    return this.formatGDD(gdd);
  }
}

module.exports = GDD;
