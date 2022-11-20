import { Link } from "react-router-dom"

const Homepage = () => {
  return (
    <div className='homepage-wrap'>
      <h1 className="home-title">Customize your APOD experience</h1>
      <div className='main-apod-cont'>
        <p>This site is dedicated to improving your Astronomy Picture of the Day (APOD) experience. More concisely browse today's picture or select a range of images and videos.</p>
        <p>Login or create an account to save favorited images!</p>
        <Link to="today" className="homepage-link">View today's image</Link>
      </div>
    </div>
  )
}

export default Homepage
