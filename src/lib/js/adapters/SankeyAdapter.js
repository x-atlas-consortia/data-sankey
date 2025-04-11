import Util from '../util/Util.js'

class SankeyAdapter {

    constructor(context, ops = {}) {
        this.ops = ops || {}
        this.ctx = context
        this.filterMap = context.flipObj(context.validFilterMap)
    }
    
    captureByKeysValue(keys, data) {
        let result = new Set()
        for (let d of data) {
            if (d[keys.matchKey] === keys.matchValue) {
                result.add(d[keys.keepKey])
            }
        }
        return result
    }
    
    getEnv() {
       return SankeyAdapter.isLocal() || this.ops.isDev  ? 'getDevEnv' : 'getProdEnv'
    }

    openUrl(url) {
        const a = document.createElement('a')
        a.href = url
        a.setAttribute('target', '_blank')
        document.body.append(a)
        a.click()
        a.remove()
    }

    getUrls() {
        const envFn = this.getEnv()
        this.ops.urls = this.ops.urls || {}
        let urls = this[envFn]()
        Object.assign(urls, this.ops.urls)
        
        return urls
    }
    
    /**
     * Checks if running in local or dev env
     * @returns {boolean}
     */
    static isLocal() {
        return Util.isLocal()
    }

    /**
     * Logs message to screen
     * @param {string} msg The message to display
     * @param {object} ops Color options for console
     */
    static log(msg, ops) {
        Util.log(msg, ops)
    }

    /**
     *  Logs message to screen.
     * @param {string} msg The message to display
     * @param {string} fn The type of message {log|warn|error}
     */
    log(msg, fn = 'log') {
        SankeyAdapter.log(msg, {fn})
    }
}

export default SankeyAdapter