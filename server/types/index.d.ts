import IUser from '../models/user';

import * as express from 'express';

declare global {
  interface Error {
    status?: number;
  }

  namespace Express {
    interface User extends IUser{}
  }


  declare global {
    namespace Express {
      interface User {
        accessToken: string; // 필요한 사용자 속성 추가
        // 다른 사용자 속성도 여기에 추가할 수 있습니다.
      }
  
      interface Request {
        user?: User; // user 속성을 추가
      }
    }
  }
  
  namespace Express {
    interface User {
      id: number;
      email: string;
      nick: string;
    }

    interface Request {
      login(user: Express.User, done: (err: any) => void): void;
      logout(done: (err: any) => void): void;
      user?: Express.User;
    }
  }
}