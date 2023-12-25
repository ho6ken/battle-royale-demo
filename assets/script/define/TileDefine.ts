import { TileModel } from "../game/mvc/model/TileModel";

/**
 * 棋寬
 */
export const TILE_W = 96;

/**
 * 棋高
 */
export const TILE_H = 96;

/**
 * 棋子群組
 */
export enum TileGroup {
    Norm   = 0,  // 一般
    Block  = 1,  // 障礙物
    Item   = 2,  // 物品
    Skill  = 3,  // 技能
    Enemy  = 4,  // 敵人
    Player = 5,  // 玩家
    None   = 9,  // 無
    Max,         //
}

/**
 * 棋種
 * @summary 編號 = 群組 * 100 + 種類
 */
export enum TileType {
    Blue    = 0,    // 藍
    Green   = 1,    // 綠
    Red     = 2,    // 紅
    Yellow  = 3,    // 黃

    Stone   = 100,  // 石頭
    Rock    = 101,  // 岩石

    Potion  = 200,  // 藥水

    Cross   = 300,  // 十字斬
    Thunder = 301,  // 雷電召喚
    Cyclone = 302,  // 旋風斬

    Warrior = 400,  // 近戰
    Archer  = 401,  // 遠程
    Armor   = 402,  // 重甲

    Hero    = 500,  // 英雄

    None    = 999,  // 無
}

/**
 * 一般棋種範圍
 */
export const NORM_TILE = { min: TileType.Blue, max: TileType.Yellow };

/**
 * 取得棋子群組
 * @param type 棋種
 */
export const TILE_GROUP_IS = (type: TileType): TileGroup => { return <TileGroup>Math.floor(type / 100); }

/**
 * 棋子行動種類
 */
export enum TileAct {
    Spawn,   // 生成
    Fall,    // 落下
    Select,  // 選擇
    Swap,    // 交換
    Crush,   // 消除
    Trans,   // 變化
    Wait,    // 等待
    Move,    // 位移
    Slip,    // 側滑
    Hit,     // 受擊
    Die,     // 死亡
    Next,    // 次回
    Skill,   // 技能
    Atk,     // 攻擊
    Cd,      // 冷卻
}

/**
 * 空棋
 */
export const NULL_TILE = new TileModel(-1);
