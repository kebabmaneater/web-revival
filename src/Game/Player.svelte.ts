import { Task } from "./Task.svelte";

interface Player {
    money: number;
    playtime: number;
    coordinates: number[];

    stats: {
        STR: number,
        ESS: number,
        AGL: number,
        SPD: number,
        INT: number,
        DEF: number,
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
            STR: 1,
            ESS: 0,
            AGL: 1,
            SPD: 1,
            INT: 1,
            DEF: 1
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

export const Player = new PlayerClass();
setInterval(() => {
    Player._player.playtime += 1;
}, 1000);
