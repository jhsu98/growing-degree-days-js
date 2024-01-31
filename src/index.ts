interface CalculationSettings {
  cutoff_min_temp: boolean;
  cutoff_max_temp: boolean;
}

class GDD {
  /**
   * Properties
   */
  #min_temp: number | null = null;
  #max_temp: number | null = null;
  #min_temp_cutoff: number | null = null;
  #max_temp_cutoff: number | null = null;
  #threshold_low: number | null = null;
  #hourly_temps: number[] | null = null;

  /**
   * Setters & Getters
   */
  set min_temp(value: number) {
    if (typeof value !== "number") throw new Error("min_temp must be a number");
    if (this.max_temp && value > this.max_temp)
      throw new Error("Low temperature cannot be higher than high temperature");
    this.#min_temp = value;
  }

  set max_temp(value: number) {
    if (typeof value !== "number") throw new Error("max_temp must be a number");
    if (this.min_temp && value < this.min_temp)
      throw new Error("High temperature cannot be lower than low temperature");
    this.#max_temp = value;
  }

  set min_temp_cutoff(value: number) {
    if (typeof value !== "number") throw new Error("min_temp_cutoff must be a number");
    this.#min_temp_cutoff = value;
  }

  set max_temp_cutoff(value: number) {
    if (typeof value !== "number") throw new Error("max_temp_cutoff must be a number");
    this.#max_temp_cutoff = value;
  }

  set threshold_low(value: number) {
    if (typeof value !== "number") throw new Error("threshold_low must be a number");
    this.#threshold_low = value;
  }

  set hourly_temps(value: number[]) {
    if (!Array.isArray(value)) throw new Error("hourly_temps must be an array");
    if (value.length > 24) throw new Error("hourly_temps cannot be longer than 24 hours");
    if (value.some((n) => typeof n !== "number")) throw new Error("hourly_temps must be an array of numbers");
    this.#hourly_temps = value;
  }

  get min_temp(): number | null {
    return this.#min_temp;
  }

  get max_temp(): number | null {
    return this.#max_temp;
  }

  get min_temp_cutoff(): number | null {
    return this.#min_temp_cutoff;
  }

  get max_temp_cutoff(): number | null {
    return this.#max_temp_cutoff;
  }

  get threshold_low(): number | null {
    return this.#threshold_low;
  }

  get hourly_temps(): number[] | null {
    return this.#hourly_temps;
  }

  /**
   * Constructor
   */
  constructor(params: any) {
    if (params?.min_temp) {
      this.min_temp = params?.min_temp;
    }

    if (params?.max_temp) {
      this.max_temp = params.max_temp;
    }

    if (params?.min_temp_cutoff) {
      this.min_temp_cutoff = params.min_temp_cutoff;
    }

    if (params?.max_temp_cutoff) {
      this.max_temp_cutoff = params.max_temp_cutoff;
    }

    if (params?.threshold_low) {
      this.threshold_low = params.threshold_low;
    }

    if (params?.hourly_temps) {
      this.hourly_temps = params.hourly_temps;
    }
  }

  /**
   * Private Methods
   */
  private dailyAverage(min_temp: number, max_temp: number, threshold_low: number): number {
    return Math.max(0, (min_temp + max_temp) / 2 - threshold_low);
  }

  /**
   * Public Methods
   */

  /**
   * Calculate the GDD using the daily average method
   * @param params modify calculation with min_temp_cutoff and/or max_temp_cutoff
   * @returns growing degree days
   */
  public calcDailyAverage(params: CalculationSettings): number {
    if (!this.min_temp) throw new SyntaxError("Parameter is not set: min_temp");
    if (!this.max_temp) throw new SyntaxError("Parameter is not set: max_temp");
    if (!this.threshold_low) throw new SyntaxError("Parameter is not set: threshold_low");

    const min_temp =
      params?.cutoff_min_temp && this.min_temp_cutoff ? Math.max(this.min_temp, this.min_temp_cutoff) : this.min_temp;

    const max_temp =
      params?.cutoff_max_temp && this.max_temp_cutoff ? Math.min(this.max_temp, this.max_temp_cutoff) : this.max_temp;

    const base = this.threshold_low;
    const gdd = this.dailyAverage(min_temp, max_temp, base);

    return gdd;
  }

  /**
   * Calculate the GDD using the Baskerville-Emin method
   * @param params modify calculation with min_temp_cutoff and/or max_temp_cutoff
   * @returns growing degree days
   */
  public calcBaskervilleEmin(params: CalculationSettings): number {
    if (!this.min_temp) throw new SyntaxError("Parameter is not set: min_temp");
    if (!this.max_temp) throw new SyntaxError("Parameter is not set: max_temp");
    if (!this.threshold_low) throw new SyntaxError("Parameter is not set: threshold_low");

    const min_temp =
      params?.cutoff_min_temp && this.min_temp_cutoff ? Math.max(this.min_temp, this.min_temp_cutoff) : this.min_temp;

    const max_temp =
      params?.cutoff_max_temp && this.max_temp_cutoff ? Math.min(this.max_temp, this.max_temp_cutoff) : this.max_temp;

    const base = this.threshold_low;

    if (max_temp < base) {
      return 0;
    }

    if (min_temp >= base) {
      return this.dailyAverage(min_temp, max_temp, base);
    }

    const avg = (max_temp + min_temp) / 2;
    const w = (max_temp - min_temp) / 2;
    const theta = Math.asin((base - avg) / w);

    const gdd = (w * Math.cos(theta) - (base - avg) * (Math.PI / 2 - theta)) / Math.PI;
    return gdd;
  }

  /**
   * Calculate the GDD using the hourly method
   * @param params modify calculation with min_temp_cutoff and/or max_temp_cutoff
   * @returns growing degree days
   */
  public calcHourlyUtilization(params: CalculationSettings): number {
    if (!this.threshold_low) throw new SyntaxError("Parameter is not set: threshold_low");
    if (!this.hourly_temps) throw new SyntaxError("Parameter is not set: hourly_temps");
    if (params?.cutoff_min_temp && !this.min_temp_cutoff) throw new SyntaxError("Parameter is not set: min_temp");
    if (params?.cutoff_max_temp && !this.max_temp_cutoff) throw new SyntaxError("Parameter is not set: max_temp");

    const ht = this.hourly_temps;
    const base = this.threshold_low;

    if (params?.cutoff_min_temp || params?.cutoff_max_temp) {
      for (let i = 0; i < ht.length; i++) {
        if (params?.cutoff_min_temp && this.min_temp_cutoff && ht[i] < this.min_temp_cutoff) {
          ht[i] = this.min_temp_cutoff;
        }
        if (params?.cutoff_max_temp && this.max_temp_cutoff && ht[i] > this.max_temp_cutoff) {
          ht[i] = this.max_temp_cutoff;
        }
      }
    }

    let gdd = 0;

    for (let h of ht) {
      const temp = Math.max(0, h - base);
      gdd += temp;
    }

    return gdd / ht.length;
  }
}

module.exports = GDD;
