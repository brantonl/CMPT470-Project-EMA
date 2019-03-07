import React from "react";
import storage from '../../utils/Storage';
import BlockButton from './BlockButton';
import EditPermissionModal from './EditPermissionModal';

const canBlockUser = storage.canBlockUser();
const canModifyUser = storage.canModifyUser();

/**
 * Add buttons to modify column
 * 
 * @param {Object} user The current user
 */
const modifyRenderer = (user) => {
    return [
        <BlockButton disabled={!canBlockUser} key="block" user={user}></BlockButton>,
        <EditPermissionModal disabled={!canModifyUser} key="update" user={{user}}></EditPermissionModal>,
    ];
};

/**
 * Table columns
 */
const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'username',
        dataIndex: 'username',
        key: 'username',
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Last Login',
        dataIndex: 'lastLogin',
        key: 'lastLogin',
    },
    {
        title: 'Modify User',
        key: 'modify',
        render: modifyRenderer,
    }
];

/**
 * @param {Array} users The users that is going to be formated
 * 
 * @returns {Array} Formatted users
 */
const formatUsers = (users) => {
    return users.map(user => {
        user.key = user.email;

        user.lastLogin = user.lastLogin 
            ? (new Date(user.lastLogin * 1000)).toDateString()
            : "Not yet logged in";
        
        return user;
    });
};

export default {
    columns,
    formatUsers,
};
