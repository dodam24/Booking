import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Express 애플리케이션 생성
const app = express();
// 환경변수 로드
dotenv.config();

// MongoDB에 연결하는 connect 함수 정의
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

// MongoDB 연결이 끊기면 로그 출력
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// 미들웨어 설정
app.use(cors());  // CORS 허용 설정
app.use(cookieParser());  // 쿠키 파싱 미들웨어 사용
app.use(express.json());  // JSON 데이터 파싱 미들웨어 사용

// 라우트 설정
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// 에러 핸들링 미들웨어 설정
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// 서버 시작 및 MongoDB 연결
app.listen(8000, () => {
  connect();
  console.log("Conncted to backend.");
});