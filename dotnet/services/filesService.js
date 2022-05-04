import axios from 'axios';
import { API_HOST_PREFIX } from './serviceHelpers';

const endpoint = `${API_HOST_PREFIX}/api/files`;

const upload = (payload) => {
    const config = {
        method: 'POST',
        url: `${endpoint}/upload`,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
    };
    return axios(config);
};

const getAll = () => {
    const config = {
        method: 'GET',
        url: endpoint,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const getFilePaginate = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const getDeletePaginate = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/deleted?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const getFileCreatedByPaginate = (createdBy, pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/createdBy?createdBy=${createdBy}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const extract = (payload) => {
    const config = {
        method: 'POST',
        url: `${endpoint}/extract`,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
    };
    return axios(config)
};
const functionsContainer = { upload, getAll, getFilePaginate, getFileCreatedByPaginate, extract, getDeletePaginate };

export default functionsContainer;
