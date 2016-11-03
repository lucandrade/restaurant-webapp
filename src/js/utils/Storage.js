'use strict';

class Storage {
    constructor() {
        this.client = window.localStorage;
    }
    get(key) {
        const value = this.client.getItem(key);
        try {
            return JSON.parse(value) || value;
        } catch (e) {
            return value;
        }
    }
    set(key, value) {
        if (typeof value == 'object') {
            try {
                value = JSON.stringify(value);
            } catch (e) {
                throw e;
            }
        }
        this.client.setItem(key, value);
    }
    forget(key) {
        this.client.removeItem(key);
    }
}

const storage = new Storage();
export default storage;
