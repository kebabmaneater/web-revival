import { Stat, Task } from "./Classes.svelte";

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

    skillData: {
        Misc: Task[]
    }
}


class PlayerClass {
    _player = $state<Player>({
        money: 0,
        playtime: 0,
        coordinates: [1920 / 3, 1080 / 3],

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
            ]
        }

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
