import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {

  const date = new Date();
  let year = date.getFullYear();

  return (
    <footer>
      <div className="footer-wrap">
        <h2 className="sr-only" data-name="h2-sr-only-follow-us-on-our-social-media-channels"></h2>
        <ul className="footer-social-links">
          <li>
            <a href="https://www.youtube.com/NASA" className="footer-link" aria-label="nasa's official YouTube" title="NASA's official YouTube">
              <FontAwesomeIcon icon={faYoutube} className='brand-icon' />
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/NASA/" className="footer-link" aria-label="nasa's official facebook" title="NASA's official Facebook">
              <FontAwesomeIcon icon={faFacebook} className='brand-icon' />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/p/ClWzGJ9SdoM/" className="footer-link" aria-label="nasa's official instagram" title="NASA's official Instagram">
              <FontAwesomeIcon icon={faInstagram} className='brand-icon' />
            </a>
          </li>
        </ul>  
        <p className="disclaimer">I don't make any money off this. It's just for me, you, and space &hearts;. &copy;{year}</p>
      </div>
    </footer>
  )
}

export default Footer
