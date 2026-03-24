import { Player } from "../Player.svelte";
import { GameAction, getSkillByName } from "./BaseAction.svelte";
import { HomeAction } from "./HomeAction.svelte";
import BeggingDisplay from "./Displays/BeggingDisplay.svelte"

export class BeggingAction extends GameAction {
    public get id() {
        return "begging"
    }

    public get displayName() {
        return "Start begging"
    }

    public displayComponent(): typeof BeggingDisplay {
        return BeggingDisplay;
    }

    public onStart(): void {

    }

    onTick(deltaTime: number, totalElapsed: number): void {
        const beggingSkill = getSkillByName("begging");
        beggingSkill.increaseXp();
        Player.money += deltaTime / 1000 * (1 + (beggingSkill.level / 5));
    }

    public switchTo(): GameAction[] {
        return [new HomeAction()]
    }

    public onExiting(): void {

    }
}
