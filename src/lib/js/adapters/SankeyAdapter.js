import Util from '../util/Util.js'

class SankeyAdapter {

    constructor(context, ops = {}) {
        this.ops = ops || {}
        this.ctx = context
        this.filterMap = context.flipObj(context.validFilterMap)
    }

    /**
     * Will capture data from particular dictionary given matching keys and values.
     * @param {object} keys The keys and values to match against
     * @param {array} data List of data to filter through
     * @returns {*}
     */
    captureByKeysValue(keys, data) {
        return Util.captureByKeysValue(keys, data)
    }

    /**
     * Gets the env function.
     * @returns {string}
     */
    getEnv() {
       return SankeyAdapter.isLocal() || this.ops.isDev  ? 'getDevEnv' : 'getProdEnv'
    }

    /**
     * Opens a given url in blank tab.
     * @param {string} url
     */
    openUrl(url) {
        const a = document.createElement('a')
        a.href = url
        a.setAttribute('target', '_blank')
        document.body.append(a)
        a.click()
        a.remove()
    }

    /**
     * Gets urls required for viewing sankey
     * @returns {*}
     */
    getUrls() {
        const envFn = this.ops.env || this.getEnv()
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