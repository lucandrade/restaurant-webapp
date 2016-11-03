'use strict';

import Request from '../utils/Request';

export default function Authenticate(username, password, callback) {
    Request.post('/user/auth', {
        username: username,
        password: password
    }).then(function (response) {
        if (response && response.data) {
            const result = response.data;
            callback(result);
        } else {
            callback({
                status: false
            });
        }
    });
}
