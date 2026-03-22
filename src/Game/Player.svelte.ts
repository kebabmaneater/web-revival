import { Stat, Task } from "./Classes.svelte";
import * as ADNotations from "@antimatter-dimensions/notations";

interface Player {
    money: number;
    playtime: number;
    coordinates: number[];

    stats: {
        STR: Stat,
        ESS: Stat,
        AGL: Stat,
        SPD: Stat,
        INT: Stat,
        DEF: Stat,
    }

    options: {
        lockWindows: boolean,
    }

    skillData: {
        Misc: Task[],
        Jobs: Task[]
    }

    notationStyle: typeof ADNotations.Notation
}


class PlayerClass {
    _player = $state<Player>({
        money: 0,
        playtime: 0,
        coordinates: [1920 / 3, 1080 / 3],

        options: {
            lockWindows: false
        },

        stats: {
            STR: new Stat({
                value: 1
            }),
            ESS: new Stat({
                value: 0
            }),
            AGL: new Stat({
                value: 1
            }),
            SPD: new Stat({
                value: 1
            }),
            INT: new Stat({
                value: 1
            }),
            DEF: new Stat({
                value: 1
            }),
        },

        skillData: {
            Misc: [
                new Task({
                    maxXp: 100,
                    name: "Strength"
                }),

                new Task({
                    maxXp: 100,
                    name: "Perseverance"
                }),


                new Task({
                    maxXp: 100,
                    name: "Exploration"
                })
            ],


            Jobs: [
                new Task({
                    maxXp: 100,
                    name: "Begging"
                })
            ]
        },

        notationStyle: new ADNotations.ScientificNotation(),
    });

    get money() {
        return this._player.money
    }

    set money(value) {
        this._player.money = value
    }

    get coordinates() {
        return this._player.coordinates
    }

    set coordinates(value) {
        this._player.coordinates = value
    }

    get playtime() {
        return this._player.playtime
    }

    get stats() {
        return this._player.stats
    }

    get skillData() {
        return this._player.skillData
    }

    get options() {
        return this._player.options
    }

    set lockWindows(value: boolean) {
        this._player.options.lockWindows = value
    }

    public notation(value: number, b: number, c: number) {
        return this._player.notationStyle.format(value, b, c);
    }
}

export function getMiscSkillByName(name: string) {
    const miscSkills = Player._player.skillData.Misc as Array<Task>;

    return miscSkills.find(
        (skill) => skill.name?.toLowerCase() === name.toLowerCase()
    );
}

export const Player = new PlayerClass();
setInterval(() => {
    Player._player.playtime += 1;
}, 1000);
