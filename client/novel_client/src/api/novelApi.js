import axios from 'axios';
export const getNovelApi = (config) => {
    // AxiosRequestConfig에는 baseURL, headers, params, data
    return axios({
        baseURL: 'https:///d3w156fo7jhtwu.cloudfront.net', // 백엔드 서버 주소
        ...config, // 호출 시 전달된 config를 여기에 병합
    });
};
export const getModelApi = (config) => {
    return axios({
        baseURL: 'http://192.168.1.251:5000', // 백엔드 서버 주소
        ...config, // 호출 시 전달된 config를 여기에 병합
    });
};
