/**
 * 隨機工具
 */
export class RandUtil {
    /**
     * 浮點數
     * @param max 不含
     * @param min 含
     */
    public static randFloat(max: number, min: number = 0): number {
        return Math.random() * (max - min) + min;
    }

    /**
     * 整數
     * @param max 不含
     * @param min 含
     */
    public static randInt(max: number, min: number = 0): number {
        return Math.floor(this.randFloat(Math.floor(max), Math.ceil(min)));
    }

    /**
     * 百分比
     * @param value 不含, 小於此值
     */
    public static randRate(value: number): boolean {
        return this.randFloat(100) < value;
    }

    /**
     * 種類
     * @param src 
     */
    public static randTypes<T>(src: T[]): T {
        return src[this.randInt(src.length)];
    }

    /**
     * 權重
     * @param src 
     * @returns 索引
     */
    public static randWeights(src: number[]): number {
        let sum = 0;
        src.forEach(weight => sum += weight);

        let rand = this.randFloat(sum);
        let curr = 0;
        let len = src.length;

        for (let i = 0; i < len; i++) {
            curr += src[i];

            if (curr > rand) {
                return i;
            }
        }

        return len - 1;
    }

    /**
     * 洗牌
     * @param src 
     */
    public static shuffle<T>(src: T[]): T[] {
        let len = src.length;

        for (let i = 0; i < len; i++) {
            let idx = this.randInt(len);
            [src[idx], src[i]] = [src[i], src[idx]];
        }

        return src;
    }
}