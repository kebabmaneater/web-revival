import { Signal } from "$lib/modules/Signal";

interface baseData {
    maxXp: number;
    name: string;
}

export interface Task {
    baseData: baseData;
    name: string;
    level: number;
    maxLevel: number;
    xp: number;
    xpMultipliers: Function[];
    onLevelUp: Signal<number>;
}

function applyMultipliers(value: number, multipliers: Function[]) {
    var finalMultiplier = 1
    multipliers.forEach(function (multiplierFunction) {
        var multiplier = multiplierFunction()
        finalMultiplier *= multiplier
    })
    var finalValue = Math.round(value * finalMultiplier)
    return finalValue
}

function applyMultipliersNonRound(value: number, multipliers: Function[]) {
    var finalMultiplier = 1
    multipliers.forEach(function (multiplierFunction) {
        var multiplier = multiplierFunction()
        finalMultiplier *= multiplier
    })
    return value * finalMultiplier
}

export class Task {
    constructor(baseData: baseData) {
        this.baseData = baseData
        this.name = baseData.name
        this.level = 0
        this.maxLevel = 0
        this.xp = 0
        this.xpMultipliers = []
        this.onLevelUp = new Signal<number>()
    }

    getMaxXp() {
        var maxXp = Math.round(this.baseData.maxXp * (this.level + 1) * Math.pow(1.01, this.level))
        return maxXp
    }

    getXpLeft() {
        return Math.round(this.getMaxXp() - this.xp)
    }

    getMaxLevelMultiplier() {
        var maxLevelMultiplier = 1 + this.maxLevel / 10
        return maxLevelMultiplier
    }

    getXpGain() {
        return applyMultipliers(1, this.xpMultipliers)
    }

    increaseXp() {
        this.xp += this.getXpGain()
        if (this.xp >= this.getMaxXp()) {
            var excess = this.xp - this.getMaxXp()
            while (excess >= 0) {
                this.level += 1
                this.onLevelUp.fire(this.level)
                excess -= this.getMaxXp()
            }
            this.xp = this.getMaxXp() + excess
        }
    }
}


interface StatBaseData {
    value: number
}

type ValueMultiplier = (value: number) => number;

export interface Stat {
    baseData: StatBaseData;
    valueMultipliers: ValueMultiplier[];
}

export class Stat {
    _inner = { value: 0 };
    private multiplierMap = new Map<string, ValueMultiplier>();

    constructor(baseData: StatBaseData) {
        this.baseData = baseData;
        this._inner.value = baseData.value;
        this.valueMultipliers = [];
    }

    get value() {
        return applyMultipliersNonRound(this._inner.value, this.valueMultipliers);
    }

    set value(_) {
        throw new Error("Do not set the value directly! Use valueMultipliers instead!");
    }

    // Add or update by key
    setFunction(key: string, func: ValueMultiplier) {
        this.multiplierMap.set(key, func);
        this.valueMultipliers = [...this.multiplierMap.values()];
    }

    removeFunction(key: string) {
        this.multiplierMap.delete(key);
        this.valueMultipliers = [...this.multiplierMap.values()];
    }

    clearFunctions() {
        this.multiplierMap.clear();
        this.valueMultipliers = [];
    }
}
