import { Signal } from '$lib/modules/Signal';

enum GameState {
	RUNNING,
	PAUSED,
	STOPPED
}

interface GameTiming {
	last: number | null;
	total: number;
	delta: number;
	lag: number;
}

interface GameOptions {
	step?: number;
	maxUpdates?: number;
}

export const Update = new Signal<[number, number]>();
export const Render = new Signal<number>();

export class Game {
	public state: GameState;
	private options: Required<GameOptions>;
	private timing!: GameTiming;
	private frame!: number;
	private numberOfUpdates: number = 0;

	public onUpdate(step: number, total: number) {
		Update.fire([step, total]);
	}
	public onRender(interpolation: number) {
		Render.fire(interpolation);
	}

	constructor(options: GameOptions = {}) {
		this.state = GameState.STOPPED;
		this.options = {
			step: 1000 / 33,
			maxUpdates: 500,
			...options
		};

		this.tick = this.tick.bind(this);
	}

	get isStopped(): boolean {
		return this.state === GameState.STOPPED;
	}

	get isPaused(): boolean {
		return this.state === GameState.PAUSED;
	}

	get isRunning(): boolean {
		return this.state === GameState.RUNNING;
	}

	pause(): void {
		if (this.isRunning) {
			this.state = GameState.PAUSED;
			cancelAnimationFrame(this.frame);
		}
	}

	recount(): void {
		if (this.isPaused) {
			this.state = GameState.RUNNING;
			this.frame = requestAnimationFrame(this.tick);
		}
	}

	start(): void {
		if (this.isStopped) {
			this.state = GameState.RUNNING;

			this.timing = {
				last: null,
				total: 0,
				delta: 0,
				lag: 0
			};

			this.frame = requestAnimationFrame(this.tick.bind(this));
		}
	}

	stop(): void {
		if (this.isRunning || this.isPaused) {
			this.state = GameState.STOPPED;
			cancelAnimationFrame(this.frame);
		}
	}

	private tick(time: number): void {
		if (this.timing.last === null) this.timing.last = time;
		this.timing.delta = time - this.timing.last;
		this.timing.total += this.timing.delta;
		this.timing.lag += this.timing.delta;
		this.timing.last = time;

		this.numberOfUpdates = 0;

		while (this.timing.lag >= this.options.step) {
			this.timing.lag -= this.options.step;
			this.onUpdate(this.options.step, this.timing.total);
			this.numberOfUpdates++;
			if (this.numberOfUpdates >= this.options.maxUpdates) {
				break;
			}
		}

		this.onRender(this.timing.lag / this.options.step);
		this.frame = requestAnimationFrame(this.tick);

		if (OfflineProps.calculating) {
			OfflineProps.offlineTick -= 1;
			if (OfflineProps.offlineTick <= 0) {
				OfflineProps.calculating = false;
				MainLoop.restart();
			}
		}
	}

	restart() {
		this.stop();
		if (OfflineProps.calculating) this.options.step = 1;
		else this.options.step = 1000 / (DevHacks.speedhack ? 100 : 33);

		this.start();
	}
}

export const OfflineProps = $state({
	initialTick: 0,
	offlineTick: 0,
	calculating: false,
	saveId: 0
});

export function RunOfflineCalculations(tick: number) {
	OfflineProps.initialTick = tick;
	OfflineProps.offlineTick = tick;

	OfflineProps.calculating = true;
	MainLoop.restart();
}

export const DevHacks = $state({
	speedhack: false,
	skipUnlock: false
});

export const MainLoop = new Game();
export const AutomationTick: number = 5;

export function CalculateOfflineTick(tick: number) {
	return Math.floor(tick / (60 * 1000));
}
