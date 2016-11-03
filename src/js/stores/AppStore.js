'use strict';

import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class AppStore extends EventEmitter {
    constructor() {
        super();
        this.user = {};
        this.menuvisible = false;
        this.page = false;
        this.message = {
            visible: false,
            text: '',
            duration: 4000
        }
    }

    getMessage() {
        return this.message;
    }

    showMessage(message) {
        this.message.visible = true;
        this.message.text = message;
        this.emit('change_message');
    }

    hideMessage(message) {
        this.message.visible = false;
        this.emit('change_message');
    }

    getPage() {
        return this.page;
    }

    setPage(page) {
        this.page = page;
        this.emit('change_page');
    }

    getUser() {
        return this.user;
    }

    setUser(user) {
        this.user = user;
        this.emit('change');
        this.emit('change_user');
    }

    toggleMenu() {
        this.menuvisible = !this.menuvisible;
        this.emit('change_menu');
    }

    closeMenu() {
        this.menuvisible = false;
        this.emit('change_menu');
    }

    isMenuVisible() {
        return this.menuvisible;
    }

    handleActions() {

    }
}

const store = new AppStore;
dispatcher.register(store.handleActions.bind(store));

window.store = store;

export default store;
