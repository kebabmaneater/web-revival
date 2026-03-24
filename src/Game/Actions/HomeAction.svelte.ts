import { GameAction } from "./BaseAction.svelte";
import { BeggingAction } from "./BeggingAction.svelte";
import HomeDisplay from "./Displays/HomeDisplay.svelte"

export class HomeAction extends GameAction {
    public get id() {
        return "home"
    }

    public get displayName() {
        return "Go home"
    }

    public switchTo(): GameAction[] {
        return [new BeggingAction()]
    }

    displayComponent(): typeof HomeDisplay {
        return HomeDisplay;
    }
}
