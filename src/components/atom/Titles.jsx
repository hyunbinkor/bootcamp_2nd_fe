const Title = (props) => {
  return (
    <div className="text-neutral text-xl font-custom font-black">
      {props.text}
    </div>
  );
};

const SubTitle = (props) => {
  return (
    <div className="text-neutral-content text-xs font-custom font-thin">
      {props.text}
    </div>
  );
};

export { Title, SubTitle };
