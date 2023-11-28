import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

// 객실 생성
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    // 새로운 객실을 저장
    const savedRoom = await newRoom.save();
    try {
      // 해당 호텔의 객실 목록에 새로운 객실 ID를 추가
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    // 성공적으로 저장된 객실을 JSON 형식으로 응답
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

// 객실 정보 업데이트
export const updateRoom = async (req, res, next) => {
  try {
    // 주어진 객실 ID에 해당하는 객실 정보를 업데이트
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    // 업데이트된 객실 정보를 JSON 형식으로 응답
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

// 이용 가능한 객실 업데이트
export const updateRoomAvailability = async (req, res, next) => {
  try {
    // 주어진 객실 번호 ID에 해당하는 객실의 이용 가능한 날짜를 업데이트
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    // 객실 상태가 업데이트 되었다는 메시지를 JSON 형식으로 응답
    res.status(200).json("객실 상태가 업데이트 되었습니다.");
  } catch (err) {
    next(err);
  }
};

// 객실 삭제
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    // 주어진 객실 ID에 해당하는 객실을 삭제
    await Room.findByIdAndDelete(req.params.id);
    try {
      // 해당 호텔의 객실 목록에서 삭제된 객실 ID를 제거
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    // 객실이 성공적으로 삭제되었다는 메시지를 JSON 형식으로 응답
    res.status(200).json("객실이 성공적으로 삭제되었습니다.");
  } catch (err) {
    next(err);
  }
};

// 특정 객실 정보 가져오기
export const getRoom = async (req, res, next) => {
  try {
    // 주어진 객실 ID에 해당하는 객실 정보를 조회
    const room = await Room.findById(req.params.id);
    // 조회된 객실 정보를 JSON 형식으로 응답
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

// 모든 객실 정보 가져오기
export const getRooms = async (req, res, next) => {
  try {
    // 모든 객실 정보를 조회
    const rooms = await Room.find();
    // 조회된 모든 객실 정보를 JSON 형식으로 응답
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};