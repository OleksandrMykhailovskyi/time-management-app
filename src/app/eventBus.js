class EventBus {
    constructor() {
        this._channels = {}
    }

    subscribe(channelName, listener) {
        if (!this._channels[channelName]) {
            this._channels[channelName] = []
        }
        if (!this._channels[channelName].find(func => func.toString() === listener.toString())) {
            this._channels[channelName].push(listener)
        }
    }
    
    publish(channelName, data) {
        const channel = this._channels[channelName];
        if (!channel || !channel.length) {
            return
        }
        channel.forEach(listener => listener(data))
    }
}
const eventBus = new EventBus();
export { eventBus };