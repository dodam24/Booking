import User from "../models/User.js";

// 사용자 정보 업데이트
export const updateUser = async (req, res, next) => {
  try {
    // 주어진 사용자 ID에 해당하는 사용자 정보를 업데이트하고, 업데이트된 사용자 정보를 JSON 형식으로 응답
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    // 에러가 발생하면 다음 미들웨어로 전달
    next(err);
  }
};

// 사용자 삭제
export const deleteUser = async (req, res, next) => {
  try {
    // 주어진 사용자 ID에 해당하는 사용자를 삭제하고, 사용자가 성공적으로 삭제되었다는 메시지를 JSON 형식으로 응답
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("사용자가 삭제되었습니다.");
  } catch (err) {
    next(err);
  }
};

// 특정 사용자 정보 가져오기
export const getUser = async (req, res, next) => {
  try {
    // 주어진 사용자 ID에 해당하는 사용자 정보를 조회하고, 조회된 사용자 정보를 JSON 형식으로 응답
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// 모든 사용자 정보 가져오기
export const getUsers = async (req, res, next) => {
  try {
    // 모든 사용자 정보를 조회하고, 조회된 모든 사용자 정보를 JSON 형식으로 응답 
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
