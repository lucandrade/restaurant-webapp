'use strict';

import Request from '../utils/Request';

export default function IsAuthenticated(callback) {
    Request.get('/user/logged').then(function (response) {
        if (response && response.data) {
            const result = response.data;
            callback(result);
        } else {
            callback({
                status: false
            });
        }
    }).catch((err) => {
        if (err.response) {
            callback({
                status: false
            });
        } else {
            throw err;
        }
    });
}
