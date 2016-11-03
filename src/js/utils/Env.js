'use strict';

const hosts = {
    dev: ['localhost'],
    homolog: ['parkme.coffeecupdev.com'],
    prod: ['parkme.com.br']
}

export default {
    get() {
        let env, regex;
        for (let e in hosts) {
            for (let h in hosts[e]) {
                regex = new RegExp(hosts[e][h]);
                if (regex.test(window.location.href)) {
                    return e;
                }
            }
        }
    },
    isDev() {
        return this.get() == 'dev';
    },
    isHomolog() {
        return this.get() == 'homolog';
    },
    isProd() {
        return this.get() == 'prod';
    }
}
