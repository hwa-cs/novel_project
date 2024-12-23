import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// 환경에 따른 baseURL 설정
const baseURLs = {
    novel: import.meta.env.VITE_NODE_ENV === 'production' 
        ? import.meta.env.VITE_PROD_NOVEL_BASE_URL // 배포 환경의 백엔드 주소
        : import.meta.env.VITE_DEV_NOVEL_BASE_URL, // 로컬 환경의 백엔드 주소
};

// Novel API 호출 함수
export const getNovelApi = (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios({
        baseURL: baseURLs.novel,
        ...config, // 호출 시 전달된 config를 병합
    });
};

export const getModelApi = (config: AxiosRequestConfig): Promise<AxiosResponse> => {
    return axios({
        baseURL: 'http://192.168.1.251:5000', // 백엔드 서버 주소
        ...config, // 호출 시 전달된 config를 여기에 병합
    });
};
