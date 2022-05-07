import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import './Styles/main.scss';


function App() {

  

  return (
    <>
      <Header />
        <main className='main-wrap'>
          <Outlet />
        </main>        
      <Footer />
    </>
  );
}

export default App;
