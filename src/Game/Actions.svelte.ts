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

let stopCurrentAction = () => {};

function startAction(actionId: string, onUpdate: () => void, onInit?: () => void) {
    if (currentAction === actionId) return;

    currentAction = actionId;
    stopCurrentAction();

    if (onInit !== undefined) onInit();
    
    stopCurrentAction = Update.connect(onUpdate);
}

function openActionMenu(actionId: string, action: ActionNode) {
    stopCurrentAction();
    currentAction = actionId;
    currentActions = getSubActions(action);
}

const ACTIONS_INFLUENCES = {
    on_begging: () =>
        startAction("begging", (data?: [number, number]) => {
            const [delta = 0] = data ?? [];
            Player.money += delta / 1000;
        }),

    on_strength_training: () =>
        startAction("strength_train", () => {
            Player._player.skillData.Misc[0].increaseXp();
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

        trick: {
            id: "trick",
            message: "Do a trick",
            message_function: () => {},
        },

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
};

const DEFAULT_ACTIONS: ActionNode[] = [ACTIONS.begging, ACTIONS.strength_train];
let currentActions: ActionNode[] = $state(DEFAULT_ACTIONS);

export function getCurrentActions(): ActionNode[] {
    return currentActions;
}
