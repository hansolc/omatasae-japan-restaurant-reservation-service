import { ReservationStatus } from "@/types/reservation";
import { BackgroundColorKeys } from "@/types/styles";

// const API_URL = "http://localhost:8080";
// const API_URL = "http://3.38.251.66:8080";
// const API_URL = "https://13.124.90.41:8080";
const PROXY_PATH = "/api/v2";

const ErrorCode = {
  "3001": "아이디가 없습니다.",
  "3002": "비밀번호가 없습니다.",
  "3003": "중복된 아이디가 있습니다.",
};

const RESERVATION_STATUS: Record<ReservationStatus, string> = {
  WAITING: "예약 대기중",
  AVAILABLE: "확정 대기중",
  UNAVAILABLE: "예약 불가능",
  CONFIRMED: "예약 확정",
  CANCELED: "예약 포기",
};

const BACKGROUND_COLOR_TEXT_MAPPING: Record<BackgroundColorKeys, string> = {
  primary: "bg-primary text-white",
  kakao: "bg-kakao text-black",
  warning: "bg-warn text-white",
};

export {
  PROXY_PATH,
  ErrorCode,
  RESERVATION_STATUS,
  BACKGROUND_COLOR_TEXT_MAPPING,
};
