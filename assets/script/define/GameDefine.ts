/**
 * 玩家起始位置
 */
export const PLAYER_START = { x: 3, y: 7 };

/**
 * 關卡資料
 */
export type StageData = { block: { max: number, min: number }, 
                          enemy: { max: number, min: number, types: number[], weights: number[] }, 
                          pass: { [type: number]: number } };

/**
 * 關卡限制
 * @param block.min 初始時最少障礙物數量
 * @param block.max 初始時最多障礙物數量
 * @param enemy.min 遊戲中最少敵人數量
 * @param enemy.max 遊戲中最多敵人數量
 * @param enemy.weights 遊戲中各敵人出現種類
 * @param enemy.weights 遊戲中各敵人出現權重
 * @param pass 通關條件
 */
export const STAGE_RULE: { [lv: number]: StageData } = {
    0: {
        block: { min: 2, max: 5 },
        enemy: { min: 3, max: 5, types: [400, 401, 402], weights: [6, 4, 2] },
        pass: { 400: 10, 401: 4, 402: 3 },
    },
    1: {
        block: { min: 0, max: 0 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [120, 0, 0] },
        pass: { 400: 15, 401: 0, 402: 0 },
    },
	2: {
        block: { min: 0, max: 0 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [0, 120, 0] },
        pass: { 400: 0, 401: 15, 402: 0 },
    },
	3: {
        block: { min: 2, max: 3 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [80, 40, 0] },
        pass: { 400: 10, 401: 5, 402: 0 },
    },
	4: {
        block: { min: 2, max: 3 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [90, 0, 30] },
        pass: { 400: 10, 401: 0, 402: 5 },
	    },
	5: {
        block: { min: 3, max: 5 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [60, 40, 20] },
        pass: { 400: 10, 401: 5, 402: 3 },
	    },
	6: {
        block: { min: 3, max: 5 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [0, 80, 40] },
        pass: { 400: 0, 401: 20, 402: 10 },
	    },
	7: {
        block: { min: 6, max: 8 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [60, 0, 60] },
        pass: { 400: 10, 401: 0, 402: 20 },
	    },
	8: {
        block: { min: 6, max: 8 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [60, 40, 20] },
        pass: { 400: 20, 401: 10, 402: 10 },
	    },
	9: {
        block: { min: 6, max: 8 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [60, 40, 20] },
        pass: { 400: 23, 401: 12, 402: 12 },
	    },
	10: {
        block: { min: 6, max: 8 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [60, 40, 20] },
        pass: { 400: 25, 401: 15, 402: 15 },
	    },
	11: {
        block: { min: 7, max: 10 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [60, 40, 20] },
        pass: { 400: 27, 401: 17, 402: 17 },
	    },
	12: {
        block: { min: 7, max: 10 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [60, 40, 20] },
        pass: { 400: 30, 401: 20, 402: 20 },
	    },
	13: {
        block: { min: 7, max: 10 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [60, 40, 20] },
        pass: { 400: 30, 401: 20, 402: 20 },
	    },
	14: {
        block: { min: 7, max: 10 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [65, 45, 25] },
        pass: { 400: 30, 401: 20, 402: 20 },
	    },
	15: {
        block: { min: 7, max: 10 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [70, 50, 30] },
        pass: { 400: 30, 401: 20, 402: 20 },
	    },
	16: {
        block: { min: 7, max: 10 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [75, 55, 35] },
        pass: { 400: 30, 401: 20, 402: 20 },
	    },
	17: {
        block: { min: 7, max: 10 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [80, 60, 40] },
        pass: { 400: 30, 401: 20, 402: 20 },
	    },
	18: {
        block: { min: 7, max: 10 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [85, 65, 45] },
        pass: { 400: 30, 401: 20, 402: 20 },
	    },
	19: {
        block: { min: 7, max: 10 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [90, 70, 50] },
        pass: { 400: 30, 401: 20, 402: 20 },
	    },
	20: {
        block: { min: 7, max: 10 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [95, 75, 55] },
        pass: { 400: 30, 401: 20, 402: 20 },
	    },
	21: {
        block: { min: 7, max: 10 },
        enemy: { min: 3, max: 21, types: [400, 401, 402], weights: [100, 80, 60] },
        pass: { 400: 30, 401: 20, 402: 20 },
	    },
};

/**
 * 開始關卡
 */
export const START_STAGE = 1;

/**
 * 最高關卡
 */
export const MAX_STAGE = Object.keys(STAGE_RULE).length;

/**
 * 角色資料
 */
export type RoleData = { hp?: number, atk?: number, def?: number, cd?: number, dex?: number, energy?: number };

/**
 * 角色表
 */
export const ROLE_TABLE: { [type: number]: RoleData } = {
    // 一般
    0: { hp: 1, atk: 30, def: 0, energy: 1 },
    1: { hp: 1, atk: 30, def: 0, energy: 1 },
    2: { hp: 1, atk: 30, def: 0, energy: 1 },
    3: { hp: 1, atk: 30, def: 0, energy: 1 },

    // 障礙物
    100: { hp: 1 },
    101: { hp: 2 },

    // 物品
    200: { atk: 100 },

    // 技能
    300: { atk: 55 },
    301: { atk: 55 },
    302: { atk: 55 },

    // 敵人
    400: { hp: 100, atk: 10, def: 5, cd: 1, dex: 2, energy: 10 },
    401: { hp: 90, atk: 5, def: 0, cd: 2, dex: 3, energy: 10 },
    402: { hp: 120, atk: 30, def: 25, cd: 3, dex: 1, energy: 10 },

    // 玩家
    500: { hp: 300, atk: 1, def: 0, cd: 2 },

    // 無
    999: { hp: 0, atk: 0, def: 0, cd: 0, dex: 0 },
};

/**
 * 大招能量上限
 */
export const MAX_ENERGY = 200;

/**
 * 大招傷害
 */
export const ULT_DAMAGE = 50;
