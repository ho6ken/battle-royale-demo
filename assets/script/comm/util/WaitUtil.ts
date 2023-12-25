/**
 * 異步等待工具
 */
export class WaitUtil {
    /**
     * 
     * @param ms 
     * @param cmpt 
     */
    public static async waitMs(ms: number, cmpt?: cc.Component): Promise<void> {
        cmpt ? await this.waitSec(ms / 1000, cmpt) : await new Promise(resolve => window.setTimeout(resolve, ms));
    }

    /**
     * 
     * @param sec 
     * @param cmpt 
     */
    public static async waitSec(sec: number, cmpt?: cc.Component): Promise<void> {
        cmpt ? await new Promise(resolve => cmpt.scheduleOnce(resolve, sec)) : await this.waitMs(sec * 1000);
    }
}