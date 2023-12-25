import { TILE_H, TILE_W } from "./TileDefine";

/**
 * 盤列數
 */
export const GRID_COL = 7;

/**
 * 盤行數
 */
export const GRID_ROW = 9;

/**
 * 盤寬
 */
export const GRID_W = GRID_COL * TILE_W;

/**
 * 盤高
 */
export const GRID_H = GRID_ROW * TILE_H;

/**
 * 落下速度
 */
export const FALL_SPEED = 0.6 / GRID_H;

/**
 * 棋子座標
 */
export type TilePos = IVec2Like;

/**
 * 比對座標
 */
export const SAME_POS = (posA: TilePos, posB: TilePos): boolean => { return posA.x == posB.x && posA.y == posB.y; };

/**
 * 四向偏移
 */
export const FOUR_DIR = { right: { x: +1, y: +0 }, bottom: { x: +0, y: -1 }, left: { x: -1, y: +0 }, top: { x: +0, y: +1 }};

/**
 * 列迴圈
 * @param act 
 */
export const FOR_COL = (act: (x: number) => void): void => { for (let i = 0; i < GRID_COL; i++) { act(i); } };

/**
 * 行迴圈
 * @param act 
 */
export const FOR_ROW = (act: (y: number) => void): void => { for (let i = 0; i < GRID_ROW; i++) { act(i); } };

/**
 * 先行後列迴圈
 * @param act 
 */
export const FOR_COL_ROW = (act: (pos: TilePos) => void): void => { FOR_ROW(y => FOR_COL(x => act({ x: x, y: y }))) };

/**
 * 先列後行迴圈
 * @param act 
 */
export const FOR_ROW_COL = (act: (pos: TilePos) => void): void => { FOR_COL(x => FOR_ROW(y => act({ x: x, y: y }))) };
