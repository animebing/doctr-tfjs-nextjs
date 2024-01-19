import { ThreeDots } from 'react-loader-spinner'

export default () => {
  return (
      <div className="absolute top-0 left-0 w-full h-full bg-white/80 flex justify-center items-center">
        <ThreeDots visible={true} color="#4fa94d" height={80} width={80} />
      </div>
  );
};