/**
 * 字串擴展
 */
interface String {
    /**
     * 格式化
     * @param params 
     * @example "{0}-{1}".format("a", 9) == "a-9"
     */
    format(...params: (string | number)[]): string;

    /**
     * 全取代
     * @param passive 被取代
     * @param active 取代
     */
    exchange(passive: string, active: string): string
}

/**
 * 格式化
 * @param this
 * @param params
 * @example "{0}-{1}".format("a", 9) == "a-9"
 */
String.prototype.format = function(this: string, ...params: (string | number)[]): string {
    return this.replace(/\{(\d+)\}/g, (src, idx) => params[idx as string]);
}

/**
 * 全取代
 * @param this
 * @param passive 被取代
 * @param active 取代
 */
String.prototype.exchange = function(this: string, passive: string, active: string): string {
    return this.replace(new RegExp(passive, "gm"), active);
}
