import axios from 'axios';
import config from '../config';
import storage from '../utils/Storage';
import validationErrorHandler from './validationErrorHandler';

const baseUrl = config.base_url;

const server = axios.create({
  baseURL: config.base_url,
});

/**
 * Login a user
 * 
 * @param {String} email
 * @param {String} password
 */
const login = async (email, password) => {
  try {
    const res = await server.post(baseUrl + 'api/v1/auth/login', {email: email, password: password});

    storage.setAuthToken(res.data.token);
    storage.setUserInfo(res.data.data);
    storage.setUserPermissionIds(res.data.permissionIds);
    window.location.reload();

    return true;
  } catch (err) {
    if (err.response.status === 400) {
      validationErrorHandler(JSON.parse(err.response.data.message));
    } if (err.response.status === 403) {
      validationErrorHandler({err: [err.response.data.message]});
    } else {
      validationErrorHandler({err: ["There is an error at the server side :("]});
    }

    return false;
  }
};

/**
 * Register a user
 * 
 * @param {String} username 
 * @param {String} email 
 * @param {String} password 
 */
const register = async (username, email, password) => {
  try {
    const payload = {username: username, email: email, password: password};

    const res = await server.post(baseUrl + 'api/v1/auth/register', payload);
  
    if (res.status !== 201) {
      return null;
    }
  
    storage.setAuthToken(res.data.token);
    storage.setUserInfo(res.data.data);
    storage.setUserPermissionIds(res.data.permissionIds);
    window.location.reload();

    return true;
  } catch (err) {
    if (err.response.status === 400) {
      validationErrorHandler(JSON.parse(err.response.data.message));
    } else {
      validationErrorHandler(`Error status: ${err.status}`);
    }

    return false;
  }
};

export default {
  login,
  register,
};
