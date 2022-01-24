import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './Styles/main.scss';


function App() {

  

  return (
    <>
      <Header />
        <div className='main-wrap'>
          <Outlet />
        </div>        
      <Footer />
    </>
  );
}

export default App;
