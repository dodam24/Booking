import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

// 호텔 생성
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// 호텔 업데이트
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// 호텔 삭제
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("호텔이 삭제되었습니다.");
  } catch (err) {
    next(err);
  }
};

// 특정 호텔 조회
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// 호텔 목록 조회 (가격 범위, 기타 조건 포함)
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;  // req.query에서 min 및 max 속성과 others 개체를 추출
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 }, // min | 1 보다는 크고, max | 999 보다는 작은 숫자를 cheapestPrice 범위로 설정
    }).limit(req.query.limit);  // limit 쿼리 매개변수를 기반으로 반환되는 결과 수를 제한
    res.status(200).json(hotels); // DB 쿼리가 성공하면 조건을 충족하는 호텔 목록이 포함된 상태 코드 200과 JSON 응답을 보낸다.
  } catch (err) {
    next(err);  // 추가 처리를 위해 오류를 next 미들웨어에 전달
  }
};

// 도시별 호텔 수 조회
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(","); // 쿼리 파라미터에서 도시들(서울, 부산, 제주)을 쉼표로 구분하여 배열로 추출
  try {
    const list = await Promise.all( // Promise.all을 사용하여 모든 도시에 대한 호텔 수를 비동기적으로 확인
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });  // 각 도시에 대한 호텔 수를 확인하고 반환
      })
    );
    res.status(200).json(list); // 호텔 수 목록을 JSON 형식으로 응답
  } catch (err) {
    next(err);  // 에러 발생 시 다음 미들웨어로 전달
  }
};

// 유형별 호텔 수 조회
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "호텔" });
    const apartmentCount = await Hotel.countDocuments({ type: "아파트" });
    const resortCount = await Hotel.countDocuments({ type: "리조트" });
    const villaCount = await Hotel.countDocuments({ type: "빌라" });
    const glampingCount = await Hotel.countDocuments({ type: "글램핑" });
    
    res.status(200).json([
      { type: "호텔", count: hotelCount },
      { type: "아파트", count: apartmentCount },
      { type: "리조트", count: resortCount },
      { type: "빌라", count: villaCount },
      { type: "글램핑", count: glampingCount },
    ]);
  } catch (err) {
    next(err);
  }
};

// 호텔의 객실 목록을 가져오는 컨트롤러 함수
export const getHotelRooms = async (req, res, next) => {
  try {
    // 요청 파라미터에서 호텔 ID를 이용해 해당 호텔을 찾는다.
    const hotel = await Hotel.findById(req.params.id);
    // 호텔에 속한 객실들에 대한 정보를 비동기적으로 조회
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    // 조회된 객실 목록을 JSON 형식으로 응답
    res.status(200).json(list)
  } catch (err) {
    // 에러가 발생하면 다음 미들웨어로 전달
    next(err);
  }
};