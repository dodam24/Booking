import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

// 사용자 등록
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);  // 비밀번호를 암호화하기 위한 salt를 생성
    const hash = bcrypt.hashSync(req.body.password, salt);  // 암호화된 비밀번호를 생성

    // 새로운 사용자 생성
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    // 새로운 사용자 정보를 저장
    await newUser.save();
    // 성공적으로 사용자가 생성되었다는 메시지를 응답
    res.status(200).send("사용자가 생성되었습니다.");
  } catch (err) {
    next(err);
  }
};

// 로그인 함수
export const login = async (req, res, next) => {
  try {
    // 주어진 사용자 이름에 해당하는 사용자를 찾는다.
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "사용자를 찾을 수 없습니다."));

    // 입력된 비밀번호를 암호화된 비밀번호와 비교
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "잘못된 비밀번호 또는 사용자 이름입니다."));

    // JWT를 사용하여 토큰을 생성
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    // 사용자 정보에서 비밀번호와 Admin 여부를 제외한 정보를 호출
    const { password, isAdmin, ...otherDetails } = user._doc;

    // 토큰을 쿠키에 저장하고, 사용자 정보를 JSON 형식으로 응답
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};