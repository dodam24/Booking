import mongoose from "mongoose";

// 사용자 정보를 저장하는 스키마 정의
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      nuique: true, // 사용자 이름과 이메일은 유일한 값이어야 함
    },
    email: {
      type: String,
      required: true,
      nuique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false, // Admin은 기본값으로 false를 가지도록 설정
    },
  },
  { timestamps: true }  // 생성 및 수정 시간을 자동으로 기록
);

export default mongoose.model("User", UserSchema);