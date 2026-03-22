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
    onLevelUp: Signal<[number, number]>;
}

function applyMultipliers(value: number, multipliers: Function[]) {
    let finalMultiplier = 1
    for (let i = 0; i < multipliers.length; i++) {
        finalMultiplier *= multipliers[i]() as number
    }
    return Math.round(value * finalMultiplier)
}

function applyMultipliersNonRound(value: number, multipliers: Function[]) {
    let finalMultiplier = 1
    for (let i = 0; i < multipliers.length; i++) {
        finalMultiplier *= multipliers[i]() as number
    }
    return value * finalMultiplier
}

export class Task {
    private static readonly LEVEL_GROWTH = 1.01

    // Cached per-instance constants/state for hot-loop performance
    private readonly _baseMaxXp: number
    private readonly _growth: number
    private _growthPowLevel: number

    constructor(baseData: baseData) {
        this.baseData = baseData
        this.name = baseData.name
        this.level = 0
        this.maxLevel = 0
        this.xp = 0
        this.xpMultipliers = []
        this.onLevelUp = new Signal<[number, number]>()

        this._baseMaxXp = baseData.maxXp
        this._growth = Task.LEVEL_GROWTH
        this._growthPowLevel = 1 // growth^level at level 0
    }

    public getMaxXp() {
        return Math.round(this._baseMaxXp * (this.level + 1) * this._growthPowLevel)
    }

    public getXpLeft() {
        return this.getMaxXp() - this.xp
    }

    public getMaxLevelMultiplier() {
        return 1 + this.maxLevel / 10
    }

    public getXpGain() {
        return applyMultipliers(1, this.xpMultipliers)
    }

    public increaseXp() {
        let gainedXp = this.getXpGain()
        if (gainedXp <= 0) return

        let level = this.level
        let xp = this.xp
        const base = this._baseMaxXp
        const growth = this._growth
        let growthPow = this._growthPowLevel

        let maxXpForLevel = Math.round(base * (level + 1) * growthPow)

        while (gainedXp > 0) {
            const xpLeft = maxXpForLevel - xp
            if (gainedXp < xpLeft) {
                xp += gainedXp
                break
            }

            gainedXp -= xpLeft
            level++
            xp = 0

            growthPow *= growth
            maxXpForLevel = Math.round(base * (level + 1) * growthPow)
        }

        const levelDiff = level - this.level
        if (levelDiff > 0) {
            this.onLevelUp.fire([level, levelDiff])
        }

        this.level = level
        this.xp = xp
        this._growthPowLevel = growthPow
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
