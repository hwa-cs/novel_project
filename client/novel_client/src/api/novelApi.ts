import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const getNovelApi = (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    // AxiosRequestConfig에는 baseURL, headers, params, data
    return axios({
        baseURL: 'http://localhost:8001', // 백엔드 서버 주소
        ...config, // 호출 시 전달된 config를 여기에 병합
    });
};

export const getModelApi = (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios({
        baseURL: 'http://192.168.1.251:5000', // 백엔드 서버 주소
        ...config, // 호출 시 전달된 config를 여기에 병합
    });
};
