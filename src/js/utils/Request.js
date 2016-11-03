'use strict';

import Axios from "axios";

import Constants from '../constants/AppConstants';
import Storage from '../utils/Storage';

const token = Storage.get('token');
const options = {
    baseURL: Constants.api_url,
    withCredentials: true,
    timeout: 30000
};

if (token) {
    options.headers = {
        Authorization: token
    }
}

const instance = Axios.create(options);

// instance.interceptors.request.use(function addTimestamp(config) {
//     config.params = config.params || {};
//     config.params._ts = (new Date()).getTime();
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

export default instance;
