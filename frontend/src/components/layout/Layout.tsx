
import Header from '../header/Header';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingScreen from '../shared/loadingScreen/LoadingScreen';


const Layout = ({ children }: { children: React.ReactNode }) => {
    const data = true;
  return (
    <>
{data ? (
   <Header/>
) : (<LoadingScreen/>)}
  <ToastContainer
        position="top-right"
        autoClose={8000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick={true} 
        rtl={false} 
        pauseOnFocusLoss={false} 
        draggable={false}
        theme="light"
      />
      <main>{children}</main>
     
    </>
  );
};

export default Layout;
