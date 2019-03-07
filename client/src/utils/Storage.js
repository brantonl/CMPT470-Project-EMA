import decodeJwt from 'jwt-decode';
import { message } from 'antd';

const STORAGE_TOKEN_KEY = 'authToken';
const STORAGE_USER_KEY = 'user';
const STORAGE_PERMISSIONS_KEY = 'permissionIds';
const STORAGE_PERMISSION_LIST_KEY = 'permissionlist';

const VIEW_USER_PERMISSION = 'read-user';
const BLOCK_USER_PERMISSION = 'block-user';
const MODIFY_PERMISSIONS = 'mod-user';
const DELETE_COMMENTS_PERMISSION = 'delete-comment'

/**
 * Get current user's auth token
 * 
 * @returns {String} Current user auth token
 */
const getAuthToken = () => {
    return window.localStorage.getItem(STORAGE_TOKEN_KEY);
};

/**
 * Set current user's auth token
 * 
 * @param {String} authToken User's auth token coming from server
 */
const setAuthToken = (authToken) => {
    window.localStorage.setItem(STORAGE_TOKEN_KEY, authToken);
}

/**
 * Get current user's information
 * 
 * @returns {Object} The user object that contains user information
 */
const getUserInfo = () => {
    return JSON.parse(window.localStorage.getItem(STORAGE_USER_KEY));
};

/**
 * Set current user info
 * 
 * @param {Object} user The current user object
 */
const setUserInfo = (user) => {
    window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
};

/**
 * Get permission list
 * 
 * @returns {Array} The permissions
 */
const getPermissionList = () => {
    return JSON.parse(window.localStorage.getItem(STORAGE_PERMISSION_LIST_KEY));
};

/**
 * Set permission list
 * 
 * @param {Array} permissionlist 
 */
const setPermissionList = (permissionlist) => {
    window.localStorage.setItem(STORAGE_PERMISSION_LIST_KEY, JSON.stringify(permissionlist));
};

/**
 * Get permission list
 * 
 * @returns {Array} The permissions
 */
const getPermissionIds = () => {
    return JSON.parse(window.localStorage.getItem(STORAGE_PERMISSIONS_KEY));
};

/**
 * @returns {Boolean} If current user can read users
 */
const canReadUser = () => {
    let isAllowed = false;

    const userPermissionIds = getPermissionIds();

    if (userPermissionIds === null || Array.isArray(userPermissionIds) === false) {
        return isAllowed;
    }

    getPermissionList().forEach(permission => {
        if (permission.name === VIEW_USER_PERMISSION && userPermissionIds.includes(permission.id)) {
            isAllowed = true;
        }
    });

    return isAllowed;
};

/**
 * @returns {Boolean} If current user can block users
 */
const canBlockUser = () => {
    let isAllowed = false;

    const userPermissionIds = getPermissionIds();

    if (userPermissionIds === null || Array.isArray(userPermissionIds) === false) {
        return isAllowed;
    }

    getPermissionList().forEach(permission => {
        if (permission.name === BLOCK_USER_PERMISSION && userPermissionIds.includes(permission.id)) {
            isAllowed = true;
        }
    });

    return isAllowed;
};

/**
 * @returns {Boolean} If current user can modify user permissions
 */
const canModifyUser = () => {
    let isAllowed = false;

    const userPermissionIds = getPermissionIds();

    if (userPermissionIds === null || Array.isArray(userPermissionIds) === false) {
        return isAllowed;
    }

    getPermissionList().forEach(permission => {
        if (permission.name === MODIFY_PERMISSIONS && userPermissionIds.includes(permission.id)) {
            isAllowed = true;
        }
    });

    return isAllowed;
};

/**
 * @returns {Boolean} If current user can delete user comments
 */
const canDeleteComments = () => {
    let isAllowed = false;

    const userPermissionIds = getPermissionIds();

    if (userPermissionIds === null || Array.isArray(userPermissionIds) === false) {
        return isAllowed;
    }

    getPermissionList().forEach(permission => {
        if (permission.name === DELETE_COMMENTS_PERMISSION && userPermissionIds.includes(permission.id)) {
            isAllowed = true;
        }
    });

    return isAllowed;
};

/**
 * Set user permissions
 * 
 * @param {Array} permissions 
 */
const setUserPermissionIds = (permissions) => {
    window.localStorage.setItem(STORAGE_PERMISSIONS_KEY, JSON.stringify(permissions));
};

/**
 * Check if user is in logged in state
 * 
 * @returns {Boolean} If user is logged in
 */
const isLoggedIn = () => {
    const token = getAuthToken();

    /* Check if has token */
    if (!token) {
        return false;
    }

    /* Check if expired */
    if (decodeJwt(getAuthToken())['exp'] <= new Date().getTime() / 1000) {
        logOutUser();
        message.error('Token expired, please login again.');
        return false;
    }

    return true;
};

/**
 * Log out an user
 */
const logOutUser = () => {
    window.localStorage.removeItem(STORAGE_TOKEN_KEY);
    window.localStorage.removeItem(STORAGE_USER_KEY);
    window.localStorage.removeItem(STORAGE_PERMISSIONS_KEY);
    window.location.reload();
};

export default {
    getAuthToken,
    setAuthToken,
    getUserInfo,
    setUserInfo,
    getPermissionList,
    setPermissionList,
    canReadUser,
    canBlockUser,
    canModifyUser,
    canDeleteComments,
    setUserPermissionIds,
    isLoggedIn,
    logOutUser,
};
