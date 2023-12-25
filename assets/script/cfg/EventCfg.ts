/**
 * 事件
 */
export enum EventSrc {
    Resize,     // 視窗調整
    Focus,      // 應用聚焦
    Blur,       // 應用失焦
    Scale,      // 時間縮放

    // 除錯
    DebugType,  // 變更棋種
    DebugCd,    // 清玩家冷卻
    DebugWin,   // 直接獲勝

    // 功能
    Fight,      // 開打
    Charge,     // 補充能量
    Ultimate,   // 使用大招
    Crushed,    // 消除方塊
    Lose,       // 失敗
}
