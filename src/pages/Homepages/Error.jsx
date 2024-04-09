import { Title } from '../../components/atom/Titles';

const Error = () => {
  return (
    <div className="flex flex-col w-full h-full max-w-screen-sm px-14 py-12">
      <div className="h-1/2" />
      <Title
        text="페이지를 찾을 수 없습니다."
        className="flex jusifty-center"
      />
      <div className="h-1/2" />
    </div>
  );
};

export default Error;
