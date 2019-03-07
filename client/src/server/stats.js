import axios from 'axios';
import config from '../config';
import storage from '../utils/Storage';

const baseUrl = config.base_url;

const server = axios.create({
  baseURL: config.base_url,
});

/**
 * @returns {Array} App stats
 */
const getStats = async () => {
    const options = {
        headers: {
            Authorization: `Bearer ${storage.getAuthToken()}`
        }
    };

    const res = await server.get(baseUrl + 'api/v1/stats', options);

    return res.data.data;
};

export default {
    getStats,
};
