import SiriWave, { ICurve, IiOS9CurveDefinition } from "./index";
export declare class iOS9Curve implements ICurve {
    ctrl: SiriWave;
    definition: IiOS9CurveDefinition;
    spawnAt: number;
    noOfCurves: number;
    prevMaxY: number;
    phases: number[];
    amplitudes: number[];
    despawnTimeouts: number[];
    offsets: number[];
    speeds: number[];
    finalAmplitudes: number[];
    widths: number[];
    verses: number[];
    GRAPH_X: number;
    AMPLITUDE_FACTOR: number;
    SPEED_FACTOR: number;
    DEAD_PX: number;
    ATT_FACTOR: number;
    DESPAWN_FACTOR: number;
    DEFAULT_NOOFCURVES_RANGES: [number, number];
    DEFAULT_AMPLITUDE_RANGES: [number, number];
    DEFAULT_OFFSET_RANGES: [number, number];
    DEFAULT_WIDTH_RANGES: [number, number];
    DEFAULT_SPEED_RANGES: [number, number];
    DEFAULT_DESPAWN_TIMEOUT_RANGES: [number, number];
    constructor(ctrl: SiriWave, definition: IiOS9CurveDefinition);
    private getRandomRange;
    private spawnSingle;
    private getEmptyArray;
    private spawn;
    private globalAttFn;
    private sin;
    private yRelativePos;
    private yPos;
    private xPos;
    private drawSupportLine;
    draw(): void | null;
    static getDefinition(): IiOS9CurveDefinition[];
}