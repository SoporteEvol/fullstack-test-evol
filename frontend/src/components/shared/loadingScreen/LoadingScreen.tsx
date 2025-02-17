
import Spinner from '../spinner/Spinner';
const LoadingScreen = () => {
  return (
    <div className="w-[100vw] h-[100vh] absolute bg-white flex justify-center items-center">
        <Spinner/>
    </div>
  )
}

export default LoadingScreen