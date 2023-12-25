import { Singleton } from "../../comm/util/Singleton";
import { GridCmd } from "../mvc/GridCmd";
import { WorkChain } from "../../comm/util/WorkChain";
import { FOR_COL_ROW, TilePos } from "../../define/GridDefine";
import { TileModel } from "../mvc/model/TileModel";
import { GridModel } from "../mvc/model/GridModel";
import { PlayerPort } from "./port/PlayerPort";
import { NormPort } from "./port/NormPort";
import { EnemyPort } from "./port/EnemyPort";
import { TileGroup } from "../../define/TileDefine";
import { TileNext } from "../act/TileNext";
import { LimitCheck } from "./check/LimitCheck";
import { FirstCheck } from "./check/FirstCheck";
import { SecondCheck } from "./check/SecondCheck";
import { SwapCheck } from "./check/SwapCheck";
import { MoveCheck } from "./check/MoveCheck";
import { ResetWork } from "./base/ResetWork";
import { SkillPort } from "./port/SkillPort";
import { UltAtk } from "./battle/UltAtk";

/**
 * 選擇條件參數
 */
export interface CheckParam {
    // 數據
    model: GridModel;

    // 命令容器
    load: GridCmd[];

    // 起點
    from: { pos: TilePos, tile: TileModel };

    // 終點
    to: { pos: TilePos, tile: TileModel };

    // 跳過減少回合
    skip?: number[];
}

/**
 * 選擇執行參數
 */
export interface SelectParam {
    // 數據
    model: GridModel;

    // 命令容器
    load: GridCmd[];

    // 初選對象
    first: TileModel;

    // 複選對象
    second: TileModel;

    // 發生變化位置
    changes?: TilePos[];

    // 工作結束
    finished?: boolean;

    // 攻擊發起者
    atkers?: TileModel[];

    // 
    enemyAtks?: number[];

    // 跳過減少回合
    skip?: number[];
}

/**
 * 選擇處理
 */
export class SelectHandler extends Singleton {
    // 選擇位置
    public get selected(): TilePos { return this._from ? this._from.pos : null; }

    // 起點
    private _from: { pos: TilePos, tile: TileModel } = null;

    // 檢查條件
    private _check: WorkChain = null;

    // 邏輯接口
    private _port: WorkChain = null;

    // 大招接口
    private _ultimate: WorkChain = null;

    // 省略減少回合
    private _skip: number[] = [];

    /**
     * 
     */
    constructor() {
        super();

        this._check = new LimitCheck();
        this._check.push(new FirstCheck());
        this._check.push(new SecondCheck());
        this._check.push(new SwapCheck());
        this._check.push(new MoveCheck());

        this._port = new ResetWork();
        this._port.push(new SkillPort());
        this._port.push(new NormPort());
        this._port.push(new PlayerPort());
        this._port.push(new EnemyPort());

        this._ultimate = new ResetWork();
        this._ultimate.push(new UltAtk());
        this._ultimate.push(new NormPort());
    }

    /**
     * 
     */
    protected onDestroy(): void {
        this._from = null;
    }

    /**
     * 執行
     * @param model 盤面數據
     * @param pos 選擇位置
     */
    public async execute(model: GridModel, pos: TilePos): Promise<GridCmd[]> {
        let load = [];
        this._skip = [];

        let param: CheckParam = { model: model, 
                                    load: load, 
                                    from: this._from, 
                                    to: { pos: pos, tile: model.getTile(pos) },
                                    skip: this._skip };

        // 選擇規則檢查
        let succeed = await this._check.execute(param);
        this._from = param.from;

        // 從入口開始執行
        if (succeed) {
            await this._port.execute({ model: model, 
                                       load: load, 
                                       first: param.from.tile, 
                                       second: param.to.tile,
                                       skip: this._skip });

            // 進入次回
            this._from = null;
            this.nextRound(model, load);
        }

        return load;
    }

    /**
     * 執行大招
     * @param model 
     */
    public async executeUlt(model: GridModel): Promise<GridCmd[]> {
        let load = [];
        this._skip = [];

        // 大招
        await this._ultimate.execute({ model: model, load: load, first: null, second: null, skip: this._skip });

        // 進入次回
        this._from = null;
        this.nextRound(model, load);

        return load;
    }

    /**
     * 進入次回
     * @param model 
     * @param load 
     */
    private async nextRound(model: GridModel, load: GridCmd[]): Promise<void> {
        let cmd = new GridCmd();
        let self = this;

        FOR_COL_ROW(pos => {
            let tile = model.getTile(pos);

            // 玩家與敵人的回合數進行顯示處理
            if (tile && (tile.group == TileGroup.Player || tile.group == TileGroup.Enemy)) {
                let dec = self._skip.indexOf(tile.id) == -1;
                tile.nextRound(dec);
                cmd.add(tile, new TileNext(dec));
            }
        });

        cc.log("次回");

        if (cmd.deed.size > 0) {
            load.push(cmd);
        }
    }
}
