import Wrapper from '../assets/wrappers/Loading';

const Loading = () => {
  return (
    <Wrapper>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Wrapper>
  );
};

export default Loading;
