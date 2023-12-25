/**
 * 單例
 */
export abstract class Singleton {
    /**
     * 實例
     * @param this 
     */
    public static inst<T>(this: new() => T): T {
        (<any>this)._inst ??= new this();
        return (<any>this)._inst;
    }

    /**
     * 銷毀
     */
    public static destroy(): void {
        (<any>this)._inst.onDestroy();
        (<any>this)._inst = null;
    }

    /**
     * 銷毀
     */
    protected abstract onDestroy(): void;
}