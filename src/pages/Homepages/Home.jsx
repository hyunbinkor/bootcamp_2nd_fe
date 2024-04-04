import { SubTitle, Title } from '../../components/atom/Titles';
import { KakaoButton, NaverButton } from '../../components/atom/Buttons';

const Home = () => {
  return (
    <div className="flex flex-col w-full h-full max-w-screen-sm px-14 py-12">
      <div className="h-1/6" />
      <div className="w-full py-4">
        <SubTitle text="나에 대한 친구들의 한마디가 궁금해?" />
      </div>
      <div className="w-full">
        <Title text="지금 로그인하고," />
      </div>
      <div className="w-full">
        <Title text="나만의 담벼락을 공유해봐" />
      </div>
      <div className="h-5/6" />
      <div className="w-full place-content-end">
        <KakaoButton redirect="/kakao" />
        <div className="my-4" />
        <NaverButton redirect="/naver" />
      </div>
    </div>
  );
};

export default Home;
