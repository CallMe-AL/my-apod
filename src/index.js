import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Today from './Routes/Today';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Homepage from './Homepage';
import Apodrange from './Routes/Apodrange';
import About from './Routes/About';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="homepage" element={<Homepage />} />
          <Route path="today" element={<Today />} />
          <Route path="range" element={<Apodrange />} />
          <Route path="about" element={<About />} />
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
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
