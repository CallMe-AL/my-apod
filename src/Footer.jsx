const Footer = () => {

  const date = new Date();
  let year = date.getFullYear();

  return (
    <footer>
      <div className="footer-wrap">
        <h2 className="sr-only" data-name="h2-sr-only-follow-us-on-our-social-media-channels"></h2>
        <ul className="footer-social-links">
          <li>
            <a href="#" className="footer-link" aria-label="twitter">
              <i aria-hidden="true" className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#" className="footer-link" aria-label="facebook">
              <i aria-hidden="true" className="fab fa-facebook"></i>
            </a>
          </li>
          <li>
            <a href="#" className="footer-link" aria-label="instagram">
              <i aria-hidden="true" className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>  
        <p className="disclaimer">I don't make any money off this. It's just for me, you, and space &hearts;. &copy;{year}</p>
      </div>
    </footer>
  )
}

export default Footer
