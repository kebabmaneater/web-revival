import { tick, type Component } from "svelte";
import { Player } from "../Player.svelte";
import type { Task } from "../Classes.svelte";
import { Render, Update } from "../Game.svelte";

export function getSkillByName(name: string): Task {
    const skills = Player._player.skillData;

    for (const tasks of Object.values(skills)) {
        const skill = tasks.find(
            (skill) => skill.name?.toLowerCase() === name.toLowerCase()
        );
        if (skill) return skill;
    }

    throw new Error("Skill does not exist!");
}

export abstract class GameAction {
    abstract get id(): string;
    abstract get displayName(): string;
    onStart(leavingAction?: GameAction): void { };
    onTick(deltaTime: number, totalElapsed: number) { };
    onExiting(timeSpent: number, totalElapsed: number): void { };

    abstract displayComponent(): Component<any>;
    switchTo(): GameAction[] { return [] };
}


class ActionManagerClass {
    private updateConnection: (() => void) | undefined;

    constructor() {
        this.updateConnection = undefined;
    }

    onClicked(actionThatGotClicked: GameAction) {
        if (this.updateConnection) this.updateConnection(); //Disconnect

        Player.currentAction.onExiting(0, 0);
        actionThatGotClicked.onStart(Player.currentAction);
        Player.currentActions = actionThatGotClicked.switchTo();
        Player.currentAction = actionThatGotClicked;
        this.updateConnection = Update.connect((data) => {
            const [deltaTime, totalElapsed] = data;
            actionThatGotClicked.onTick(deltaTime, totalElapsed);
        })
    }
}

export const ActionManager = new ActionManagerClass();
