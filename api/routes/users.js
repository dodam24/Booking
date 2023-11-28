import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// // 인증 확인을 위한 라우트: 토큰 검증 미들웨어(verifyToken)를 거친 후 응답
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("안녕하세요. 로그인 되었습니다.");
// });

// // 사용자 확인을 위한 라우트: 사용자 검증 미들웨어(verifyUser)를 거친 후 응답
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("안녕하세요 사용자님, 로그인 되었으며 계정을 삭제할 수 있습니다.");
// });

// // 관리자 확인을 위한 라우트: 관리자 검증 미들웨어(verifyAdmin)를 거친 후 응답
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("안녕하세요 관리자님, 로그인 되었으며 모든 계정을 삭제할 수 있습니다.");
// });

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;