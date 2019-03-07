import { message } from 'antd';

/**
 * Display error messages
 * 
 * @param {Object} errors The laravel validation error messages
 */
export default (errors) => {
    Object.keys(errors).forEach(key => {
        errors[key].forEach(error => {
            message.error(error);
        });
    });
};
