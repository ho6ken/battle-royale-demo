import { WorkChain } from "../../../comm/util/WorkChain";
import { TileGroup } from "../../../define/TileDefine";
import { SelectParam } from "../SelectHandler";
import { ComboWork } from "../base/ComboWork";
import { CrushWork } from "../base/CrushWork";
import { DropWork } from "../base/DropWork";
import { SlipWork } from "../base/SlipWork";
import { StuffWork } from "../base/StuffWork";
import { NormAtk } from "../battle/NormAtk";

/**
 * 一般棋種接口
 */
export class NormPort extends WorkChain {
    // 行動流程
    private _process: WorkChain = null;

    /**
     * 
     */
    constructor() {
        super();

        this._process = new CrushWork();
        this._process.push(new NormAtk());
        this._process.push(new DropWork());
        this._process.push(new StuffWork());
        this._process.push(new SlipWork());
        this._process.push(new ComboWork());
    }

    /**
     * 清除
     * @param param 
     */
    private clear(param: SelectParam): void {
        param.changes = [];
        param.finished = false;
        param.atkers = [];
    }

    /**
     * 業務處理
     * @param param 
     * @returns 繼續向下執行
     */
    protected async business(param: SelectParam): Promise<boolean> {
        this.clear(param);

        // 將初複選對象加入作用域中
        [param.first, param.second].forEach(elm => {
            elm && elm.group == TileGroup.Norm && param.changes.push(elm.pos);
        });

        // 處理與連鎖
        do {
            param.finished = false;
            await this._process.execute(param);
        }
        while (!param.finished);

        return true;
    }
}
