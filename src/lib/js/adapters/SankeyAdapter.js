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
    /**
     * Checks if running in local or dev env
     * @returns {boolean}
     */
    static isLocal() {
        return SankeyAdapter.isLocalHost() || (location.host.indexOf('.dev') !== -1)
    }

    static isLocalHost() {
        return (location.host.indexOf('localhost') !== -1)
    }

    /**
     * Logs message to screen
     * @param {string} msg The message to display
     * @param {object} ops Color options for console
     */
    static log(msg, ops) {
        ops = ops || {}
        let {fn, color, data} = ops
        fn = fn || 'log'
        color = color || '#bada55'
        data = data || ''
        if (SankeyAdapter.isLocal()) {
            console[fn](`%c ${msg}`, `background: #222; color: ${color}`, data)
        }
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