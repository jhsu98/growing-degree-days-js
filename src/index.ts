class GDD {
  /**
   * Private Properties
   */
  #min_temperature: number | null = null;
  #max_temperature: number | null = null;
  #threshold_low: number | null = null;

  /**
   * Setters & Getters
   */
  set min_temperature(value: number) {
    if (typeof value !== "number") throw new Error("min_temperature must be a number");
    if (this.max_temperature && value > this.max_temperature)
      throw new Error("Low temperature cannot be higher than high temperature");
    this.#min_temperature = value;
  }

  set max_temperature(value: number) {
    if (typeof value !== "number") throw new Error("max_temperature must be a number");
    if (this.min_temperature && value < this.min_temperature)
      throw new Error("High temperature cannot be lower than low temperature");
    this.#max_temperature = value;
  }

  set threshold_low(value: number) {
    if (typeof value !== "number") throw new Error("threshold_low must be a number");
    this.#threshold_low = value;
  }

  get min_temperature(): number | null {
    return this.#min_temperature;
  }

  get max_temperature(): number | null {
    return this.#max_temperature;
  }

  get threshold_low(): number | null {
    return this.#threshold_low;
  }

  /**
   * Constructor
   */
  constructor(params: any) {
    if (params?.min_temperature) {
      this.min_temperature = params?.min_temperature;
    }
    if (params?.max_temperature) {
      this.max_temperature = params.max_temperature;
    }
    if (params?.threshold_low) {
      this.threshold_low = params.threshold_low;
    }
  }

  /**
   * Private Methods
   */
  private dailyAverage(min_temperature: number, max_temperature: number, threshold_low: number): number {
    return Math.max(0, (min_temperature + max_temperature) / 2 - threshold_low);
  }

  /**
   * Public Methods
   */
  public calcDailyAverage(): number {
    if (!this.min_temperature) throw new SyntaxError("Parameter is not set: min_temperature");
    if (!this.max_temperature) throw new SyntaxError("Parameter is not set: max_temperature");
    if (!this.threshold_low) throw new SyntaxError("Parameter is not set: threshold_low");

    if (!this.threshold_low) {
      throw new Error("Low threshold must be set");
    }

    const gdd = this.dailyAverage(this.min_temperature, this.max_temperature, this.threshold_low);
    return gdd;
  }

  public calcBaskervilleEmin(): number {
    if (!this.min_temperature) throw new SyntaxError("Parameter is not set: min_temperature");
    if (!this.max_temperature) throw new SyntaxError("Parameter is not set: max_temperature");
    if (!this.threshold_low) throw new SyntaxError("Parameter is not set: threshold_low");

    const min = this.min_temperature;
    const max = this.max_temperature;
    const base = this.threshold_low;

    if (max < base) {
      return 0;
    }

    if (min >= base) {
      return this.dailyAverage(min, max, base);
    }

    const avg = (max + min) / 2;
    const w = (max - min) / 2;
    const theta = Math.asin((base - avg) / w);

    const gdd = (w * Math.cos(theta) - (base - avg) * (Math.PI / 2 - theta)) / Math.PI;
    return gdd;
  }
}

module.exports = GDD;
