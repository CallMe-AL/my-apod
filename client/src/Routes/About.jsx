import NasaLogo from '../Images/NASA_logo.svg.png';

const About = () => {
  return (
    <div className="about-div">
      <h1>About my<span>APOD</span></h1>
      <img src={NasaLogo} alt="nasa logo" className='about-img'/>
      <p>Begun in 1995 by Robert Nemiroff and Jerry Bonnell, Astronomy Picture of the Day (APOD) is one of NASA's most popular public programs. Each day of the week features a different image, photograph, or video of our amazing universe, along with a brief explanation by a professional astronomer.</p>
      <p>As for this site, it was begun mid-January 2022 by some web dev hobbyist who happens to like astronomy. It was mostly for practice, but I hope you find some value out of it, too!</p>
      <p>I'm always open to recommendations! Feel free to reach out to me on my <a href='https://callme-al.github.io/portfolio/' className='portfolio-link'>portfolio</a> for any concerns!</p>
      <div className="useful-links-cont">
        <h2>Keep exploring: </h2>
        <ul className="useful-links">
          <li>
            <a className="useful-link" href="https://apod.nasa.gov/apod/astropix.html">The O.G. APOD website!</a>
          </li>
          <li>
            <a className="useful-link" href="https://www.nasa.gov/">NASA's official site</a>
          </li>
          <li>
            <a className="useful-link" href="https://hubblesite.org/resource-gallery/learning-resources/hubble-heritage">Hubble Heritage, a collection of Hubble images</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default About
