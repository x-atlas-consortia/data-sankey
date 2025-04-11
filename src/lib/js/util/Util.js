class Util {
    /**
     * Checks if running in local or dev env
     * @returns {boolean}
     */
    static isLocal() {
        return (location.host.indexOf('localhost') !== -1) || (location.host.indexOf('.dev') !== -1)
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
        if (Util.isLocal()) {
            console[fn](`%c ${msg}`, `background: #222; color: ${color}`, data)
        }
    }

    /**
     *  Logs message to screen.
     * @param {string} msg The message to display
     * @param {string} fn The type of message {log|warn|error}
     */
    log(msg, fn = 'log') {
        Util.log(msg, {fn})
    }
}

export default Util