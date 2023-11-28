import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// JWT 토큰을 검증하여 사용자를 인증하는 미들웨어
export const verifyToken = (req, res, next) => {
  // 요청 쿠키에서 액세스 토큰을 가져온다.
  const token = req.cookies.access_token;
  if (!token) {
    // 토큰이 없으면 401 에러를 생성하고 다음 미들웨어로 전달
    return next(createError(401, "인증되지 않았습니다."));
  }

  // JWT를 사용하여 토큰을 검증하고, 사용자 정보를 추출
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "토큰이 유효하지 않습니다."));  //
    req.user = user;
    next();
  });
};

// 사용자(User) 권한을 검증하는 미들웨어
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // 요청한 사용자 ID나 관리자(Admin) 여부를 확인하여 권한을 부여
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      // 권한이 없으면 403 에러를 생성하고 다음 미들웨어로 전달
      return next(createError(403, "사용자 권한이 없습니다."));
    }
  });
};

// 관리자(Admin) 권한을 검증하는 미들웨어
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // 관리자 여부를 확인하여 관리자 권한이 있으면 다음 미들웨어로 전달
    if (req.user.isAdmin) {
      next();
    } else {
      // 관리자 권한이 없으면 403 에러를 생성하고 다음 미들웨어로 전달
      return next(createError(403, "관리자 권한이 없습니다."));
    }
  });
};