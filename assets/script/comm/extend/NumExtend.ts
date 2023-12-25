/**
 * 數字擴展
 */
interface Number {
    /**
     * 限制範圍
     * @param min 含
     * @param max 含
     */
    limit(min: number, max: number): number;
}

/**
 * 限制範圍
 * @param this
 * @param min 含
 * @param max 含
 */
Number.prototype.limit = function(this: number, min: number, max: number): number {
    let value = this.valueOf();
    return value >= max ? max : (value <= min ? min : value);
}
