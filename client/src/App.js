import React, { useState, useEffect } from 'react';
import MainPage from './MainPage';
import Today from './Routes/Today';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Homepage from './Homepage';
import Apodrange from './Routes/Apodrange';
import About from './Routes/About';
import Single from './Routes/Single';
import Register from './Routes/Register';
import Profile from './Routes/Profile';
import Login from './Routes/Login';
import Logout from './Routes/Logout';
import RequireAuth from './RequireAuth';
import RequireLogout from './RequireLogout';
import VerifyEmail from './Routes/VerifyEmail';

// styles
import './Styles/main.scss';


// my auth files
import { AuthProvider } from './AuthContext';

// firebase files
import { auth, db } from './fb-stuff/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// firestore stuff
import { collection, query, where, getDocs } from "firebase/firestore";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [timeActive, setTimeActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favoriteApods, setFavoriteApods] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }      
    });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const q = query(collection(db, 'fav_apods'), where("userId", "==", currentUser.uid));
    const temp_favs = [];

    getDocs(q)
      .then((query) => {
        query.forEach((doc) => {
          // console.log(doc.id, "=>", doc.data())
          temp_favs.push({ docId: doc.id, data: doc.data() });
        })
      })
      .then(() => setFavoriteApods(temp_favs));

  }, [isLoggedIn]);

  return (
    <>
      <HashRouter>
        <AuthProvider 
          value={{ 
                    currentUser, 
                    favoriteApods,
                    isLoggedIn,
                    timeActive,
                    setFavoriteApods, 
                    setIsLoggedIn,
                    setTimeActive 
                  }}
            >
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route path="homepage" element={<Homepage />} />
              <Route path="today" element={<Today />} />
              <Route path="single" element={<Single />} />
              <Route path="range" element={<Apodrange />} />
              <Route path="about" element={<About />} />
              <Route path="register" element={<Register />} />
              <Route path="verify-email" element={<VerifyEmail />} />
              <Route path="login" element={<Login />} />
              {/* pushes to login for profile if email not verified */}
              <Route 
                path="profile" 
                element={
                  <RequireAuth redirectTo='/login'>
                    <Profile />
                  </RequireAuth>
                } 
              />              
              {/* display logout page if user logged out */}
              <Route 
                path="logout" 
                element={
                  <RequireLogout redirectTo='/homepage'>
                    <Logout />
                  </RequireLogout>
                } 
              />              
              <Route 
                index
                element={<Homepage />}
              />
            </Route>
            <Route 
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Oops! Wrong path!</p>
                  <Link to="/">Return home</Link>
                </main>
              }
            />
          </Routes>  
        </AuthProvider>    
      </HashRouter>
    </>
  );
}

export default App;
