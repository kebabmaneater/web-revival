import type { Task } from "./Classes.svelte";
import { Update } from "./Game.svelte";
import { Player } from "./Player.svelte";

export type ActionNode = {
    id: string;
    message: string;
    message_function: () => void;
    [key: string]: (() => void) | string | ActionNode;
};

let currentAction: string = $state("home");
export function getCurrentAction() {
    return currentAction;
}

let stopCurrentAction = () => { };

function startAction(actionId: string, onUpdate: () => void) {
    if (currentAction === actionId) return;

    currentAction = actionId;
    stopCurrentAction();

    stopCurrentAction = Update.connect(onUpdate);
}

function openActionMenu(actionId: string, action: ActionNode) {
    stopCurrentAction();
    currentAction = actionId;
    currentActions = getSubActions(action);
}

function getMiscSkillByName(name: string) {
    const miscSkills = Player._player.skillData.Misc as Array<Task>;

    return miscSkills.find(
        (skill) => skill.name?.toLowerCase() === name.toLowerCase()
    );
}

function getJobSkillByName(name: string) {
    const miscSkills = Player._player.skillData.Jobs as Array<Task>;

    return miscSkills.find(
        (skill) => skill.name?.toLowerCase() === name.toLowerCase()
    );
}


const ACTIONS_INFLUENCES = {
    on_begging: () =>
        startAction("begging", (data?: [number, number]) => {
            const beggingSkill = getJobSkillByName("begging");
            if (beggingSkill === undefined) return;
            beggingSkill.increaseXp();

            const [delta = 0] = data ?? [];
            Player.money += delta / 1000 * (1 + (beggingSkill.level / 5));
        }),

    on_strength_training: () =>
        startAction("strength_train", () => {
            const strengthSkill = getMiscSkillByName("strength");
            if (strengthSkill === undefined) return;
            strengthSkill.increaseXp();

            strengthSkill.onLevelUp.connect((data) => {
                const [newLevel, _] = data
                const mult = newLevel * 0.01 + 1
                Player._player.stats.STR.setFunction("strength_train",
                    () => {
                        return mult
                    }
                )
            })
        }),
};

const GO_HOME: ActionNode = {
    id: "home",
    message: "Go home",
    message_function: () => {
        stopCurrentAction();
        currentAction = "home";
        currentActions = DEFAULT_ACTIONS;
    },
};

function getSubActions(action: ActionNode): ActionNode[] {
    return Object.values(action).filter(
        (v): v is ActionNode =>
            typeof v === "object" &&
            v !== null &&
            "id" in v &&
            "message" in v &&
            "message_function" in v
    );
}

export const ACTIONS = {
    begging: {
        id: "begging",
        message: "Start begging",
        message_function: () => {
            ACTIONS_INFLUENCES.on_begging();
            currentActions = getSubActions(ACTIONS.begging);
        },

        // trick: {
        //     id: "trick",
        //     message: "Do a trick",
        //     message_function: () => { },
        // },

        home: GO_HOME,
    },

    strength_train: {
        id: "strength_train",
        message: "Start strength training",
        message_function: () => {
            ACTIONS_INFLUENCES.on_strength_training();
            currentActions = getSubActions(ACTIONS.strength_train);
        },


        home: GO_HOME,
    },

    shop: {
        id: "shop",
        message: "Go to a shop",
        message_function: () => openActionMenu("shop", ACTIONS.shop),

        home: GO_HOME,
    },

    explore: {
        id: "explore",
        message: "Go exploring",
        message_function: () => {
            const doWhat = Math.random() > 0.9;

            stopCurrentAction();
            currentAction = "explore";
            if (doWhat) {
                currentActions = [EXPLORATION.enemy_found, EXPLORATION.flee];
            } else {
                currentActions = getSubActions(ACTIONS.explore)
            }
        },

        continue: {
            id: "explore_continue",
            message: "Go further",
            message_function: () => {
                stopCurrentAction();
                currentAction = "explore";
                currentActions = [EXPLORATION.enemy_found, EXPLORATION.flee];
            },
        }
    },
};

const EXPLORATION = {
    enemy_found: {
        id: "enemy",
        message: "Fight enemy",
        message_function: () => {
            stopCurrentAction();
            currentAction = "home";
            currentActions = DEFAULT_ACTIONS;
        },
    },

    flee: {
        id: "flee",
        message: "Attempt to flee",
        message_function: () => {
            stopCurrentAction();
            currentAction = "home";
            currentActions = DEFAULT_ACTIONS;
        },
    }
}
// , ACTIONS.strength_train, ACTIONS.shop, ACTIONS.explore
const DEFAULT_ACTIONS: ActionNode[] = [ACTIONS.begging];
let currentActions: ActionNode[] = $state(DEFAULT_ACTIONS);

export function getCurrentActions(): ActionNode[] {
    return currentActions;
}
