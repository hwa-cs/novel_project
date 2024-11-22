import axios from 'axios';

export const getNovelApi = (config) => {
    return axios({
        baseURL: 'http://localhost:8001', // 백엔드 서버 주소
        ...config,  // 호출 시 전달된 config를 여기에 병합
    });
};