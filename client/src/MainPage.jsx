import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const MainPage = () => {
  return (
    <>
      <Header />
        <main className='main-wrap'>
          <Outlet />
        </main>        
      <Footer />
    </>
  )
}

export default MainPage