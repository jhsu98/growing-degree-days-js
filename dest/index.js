"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _GDD_rounding, _GDD_decimal_places, _GDD_low_temperature, _GDD_high_temperature, _GDD_threshold_low, _GDD_threshold_high;
class GDD {
    /**
     * Setters & Getters
     */
    set rounding(value) {
        if (!["floor", "ceil", "round", "none"].includes(value))
            throw new TypeError("Invalid rounding option");
        __classPrivateFieldSet(this, _GDD_rounding, value, "f");
    }
    set decimal_places(value) {
        if (isNaN(value))
            throw new TypeError("decimal_places must be a number");
        if (!Number.isInteger(value))
            throw new TypeError("Decimal places must be an integer");
        if (value < 0)
            throw new RangeError("Decimal places cannot be less than 0");
        __classPrivateFieldSet(this, _GDD_decimal_places, value, "f");
    }
    set low_temperature(value) {
        if (typeof value !== "number")
            throw new Error("low_temperature must be a number");
        if (this.high_temperature && value > this.high_temperature)
            throw new Error("Low temperature cannot be higher than high temperature");
        __classPrivateFieldSet(this, _GDD_low_temperature, value, "f");
    }
    set high_temperature(value) {
        if (typeof value !== "number")
            throw new Error("high_temperature must be a number");
        if (this.low_temperature && value < this.low_temperature)
            throw new Error("High temperature cannot be lower than low temperature");
        __classPrivateFieldSet(this, _GDD_high_temperature, value, "f");
    }
    set threshold_low(value) {
        if (typeof value !== "number")
            throw new Error("threshold_low must be a number");
        if (this.threshold_high && value > this.threshold_high)
            throw new Error("Low threshold cannot be higher than high threshold");
        __classPrivateFieldSet(this, _GDD_threshold_low, value, "f");
    }
    set threshold_high(value) {
        if (typeof value !== "number")
            throw new Error("threshold_high must be a number");
        if (this.threshold_low && value < this.threshold_low)
            throw new Error("High threshold cannot be lower than low threshold");
        __classPrivateFieldSet(this, _GDD_threshold_high, value, "f");
    }
    get low_temperature() {
        return __classPrivateFieldGet(this, _GDD_low_temperature, "f");
    }
    get high_temperature() {
        return __classPrivateFieldGet(this, _GDD_high_temperature, "f");
    }
    get threshold_low() {
        return __classPrivateFieldGet(this, _GDD_threshold_low, "f");
    }
    get threshold_high() {
        return __classPrivateFieldGet(this, _GDD_threshold_high, "f");
    }
    /**
     * Constructor
     */
    constructor(params) {
        /**
         * Private Properties
         */
        _GDD_rounding.set(this, "none");
        _GDD_decimal_places.set(this, null);
        _GDD_low_temperature.set(this, null);
        _GDD_high_temperature.set(this, null);
        _GDD_threshold_low.set(this, null);
        _GDD_threshold_high.set(this, null);
        if (params === null || params === void 0 ? void 0 : params.rounding)
            __classPrivateFieldSet(this, _GDD_rounding, params === null || params === void 0 ? void 0 : params.rounding, "f");
        if (params === null || params === void 0 ? void 0 : params.decimal_places)
            __classPrivateFieldSet(this, _GDD_decimal_places, params === null || params === void 0 ? void 0 : params.decimal_places, "f");
        if (params === null || params === void 0 ? void 0 : params.low_temperature) {
            this.low_temperature = params === null || params === void 0 ? void 0 : params.low_temperature;
        }
        if (params === null || params === void 0 ? void 0 : params.high_temperature) {
            this.high_temperature = params.high_temperature;
        }
        if (params === null || params === void 0 ? void 0 : params.threshold_low) {
            this.threshold_low = params.threshold_low;
        }
        if (params === null || params === void 0 ? void 0 : params.threshold_high) {
            this.threshold_high = params.threshold_high;
        }
    }
    /**
     * Private Methods
     */
    formatGDD(gdd) {
        switch (__classPrivateFieldGet(this, _GDD_rounding, "f")) {
            case "floor":
                gdd = Math.floor(gdd);
            case "ceil":
                gdd = Math.ceil(gdd);
            case "round":
                gdd = Math.round(gdd);
        }
        if (typeof __classPrivateFieldGet(this, _GDD_decimal_places, "f") === "number") {
            gdd = Number(gdd.toFixed(__classPrivateFieldGet(this, _GDD_decimal_places, "f")));
        }
        return gdd;
    }
    dailyAverage(low_temperature, high_temperature, threshold_low) {
        return this.formatGDD(Math.max(0, (low_temperature + high_temperature) / 2 - threshold_low));
    }
    /**
     * Public Methods
     */
    calcDailyAverage() {
        if (!this.low_temperature || !this.high_temperature) {
            throw new Error("Low and high temperatures must be set");
        }
        if (!this.threshold_low) {
            throw new Error("Low threshold must be set");
        }
        const gdd = this.dailyAverage(this.low_temperature, this.high_temperature, this.threshold_low);
        return gdd;
    }
    calcBaskervilleEmin() {
        if (!this.low_temperature)
            throw new SyntaxError("Parameter is not set: low_temperature");
        if (!this.high_temperature)
            throw new SyntaxError("Parameter is not set: high_temperature");
        if (!this.threshold_low)
            throw new SyntaxError("Parameter is not set: threshold_low");
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
_GDD_rounding = new WeakMap(), _GDD_decimal_places = new WeakMap(), _GDD_low_temperature = new WeakMap(), _GDD_high_temperature = new WeakMap(), _GDD_threshold_low = new WeakMap(), _GDD_threshold_high = new WeakMap();
module.exports = GDD;
