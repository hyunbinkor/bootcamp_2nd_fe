import axios, { isAxiosError, HttpStatusCode } from 'axios';
import { useErrorBoundary } from 'react-error-boundary';

const { showBoundary } = useErrorBoundary;

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_URI,
  timeout: 5000,
  withCredentials: true
});

// 요청 인터셉터 추가하기
axiosInstance.interceptors.request.use(
  (config) => {
    // 요청이 전달되기 전에 작업 수행
    console.log(config);
    return config;
  },
  (error) => {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답 데이터를 반환
    const res = response.data;
    console.log(res);
    return res;
  },
  (error) => {
    // AxiosError들에 대해서 핸들링
    if (isAxiosError(error)) {
      if (error.response.status === HttpStatusCode.BadRequest) {
        throw new Error('포털의 문제로 로그인에 실패하였습니다.');
      }
      if (error.response.status === HttpStatusCode.Unauthorized) {
        throw new Error('이미 정원이 존재하는 사용자입니다.');
      }
      if (error.response.status === HttpStatusCode.Forbidden) {
        throw new Error('모든 질문에 답변해주세요.');
      }
      if (error.response.status === HttpStatusCode.NotFound) {
        throw new Error('잘못된 주소입니다.');
      }
      if (error.response.status === HttpStatusCode.InternalServerError) {
        throw new Error('서버에 문제가 있습니다. 잠시 뒤에 시도해주세요.');
      }
    } else {
      throw new Error('예상치 못한 에러가 발생했습니다.');
    }
  }
);

export default axiosInstance;
