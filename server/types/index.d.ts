// types.ts 또는 custom.d.ts

import { Request } from 'express';

declare global {
  interface Error {
    status?: number;
  }

  // 사용자 타입 정의
  interface User {
    id: number;
    email: string;
    nick: string;
    provider: string;
    accessToken: string;
  }

  // 커스텀 Request 타입 정의
  interface CustomRequest extends Request {
    user?: User; // user 속성 추가
  }

  namespace Express {
    // Express의 User 인터페이스 확장
    interface User {
      id: number;
      email: string;
      nick: string;
      provider: string;
      accessToken: string;
      snsId?: string; // snsId가 없는 경우도 처리할 수 있도록 옵셔널로 추가
    }

    // Request 객체에 사용자 정보 추가
    interface Request {
      user?: User; // user 속성 추가
    }
  }
}

export { CustomRequest };