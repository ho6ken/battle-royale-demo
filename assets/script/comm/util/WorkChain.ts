/**
 * 工作鏈
 */
export abstract class WorkChain {
    // 下一鏈
    private _next: WorkChain = null;

    /**
     * 加入新鏈
     * @param chain 
     * @summary 已有下一鏈則加入至末端
     */
    public push(chain: WorkChain): WorkChain {
        if (this._next) {
            return this._next.push(chain);
        }
        else {
            this._next = chain;
            return this;
        }
    }

    /**
     * 插入新鏈
     * @param chain 
     * @summary 將此鏈的下一鏈改成新鏈, 原本的下一鏈則接上新鏈
     */
    public insert(chain: WorkChain): WorkChain {
        chain._next = this._next;
        this._next = chain;
        
        return chain;
    }

    /**
     * 執行
     * @param params 
     * @returns 全鏈執行完畢
     */
    public async execute(...params: any): Promise<boolean> {
        if (await this.business(...params)) {
            return this._next ? await this._next.execute(...params) : true;
        }

        return false;
    }

    /**
     * 業務處理
     * @param params 
     * @returns 繼續向下執行
     */
    protected abstract business(...params: any): Promise<boolean>;
}