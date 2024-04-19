import { Title } from '../../components/atom/Titles';

const Load = () => {
  console.log('mount loading');
  return (
    <div className="bg-bgcolor w-screen h-screen justify-center z-10 flex flex-col max-w-screen-sm px-14 py-12">
      <div className="h-1/2" />
      <Title text="로딩중" className="flex jusifty-center" />
      <div className="h-1/2" />
    </div>
  );
};

export default Load;
