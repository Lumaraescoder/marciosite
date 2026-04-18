import Paymentcards from "../components/Paymentcards";
import Socials from "../components/Socials";
import Image from "next/image";
import FooterLinksTwo from "../components/FooterLinksTwo";

export default function FooterFour() {
  return (
    <footer className="footer -type-1 -light bg-dark-1">
      <div className="footer__main">
        <div className="container">
          <div className="footer__info">
            <div className="row y-gap-20 justify-between">
              <div className="col-auto">
                <div className="row y-gap-20 items-center">
                  <div className="col-auto">
                    <i className="icon-headphone text-50 text-white"></i>
                  </div>

                  <div className="col-auto">
                    <div className="text-20 fw-500 text-white text-white">
                      Book By phone
                      <span className="text-white"> +351 928 346 074</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="col-auto">
                <div className="footerSocials">
                  <div className="footerSocials__title text-white">
                    Follow Us
                  </div>

                  <div className="footerSocials__icons text-white">
                    <Socials />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="border-white-15-top">
          <div className="container">
            <div className="footer__content">
              <div className="row y-gap-40 justify-between">
                <div className="col-lg-4 col-md-6">
                  <h4 className="text-20 fw-500 text-white">Contact</h4>

                  <div className="y-gap-10 mt-20 text-white">
                    <a className="d-block" href="#">
                      328 Queensberry Street, North Melbourne VIC3051,
                      Australia.
                    </a>
                    <a className="d-block" href="#">
                      hi@viatours.com
                    </a>
                  </div>
                </div>

                <FooterLinksTwo />

                <div className="col-lg-3 col-md-6">
                  <h4 className="text-20 fw-500 text-white">Newsletter</h4>
                  <p className="text-white mt-20">
                    Subscribe to the free newsletter and stay up to date
                  </p>

                  <div className="footer__newsletter">
                    <input type="Email" placeholder="Your email address" />
                    <button>Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-white-15-top">
        <div className="container">
          <div className="footer__bottom">
            <div className="row y-gap-5 justify-between items-center">
              <div className="col-auto text-white">
                <div>
                  {" "}
                  <span> Made By</span>
                  <a
                    href="https://www.arcanadigital.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Arcana Digital
                  </a>
                  {new Date().getFullYear()}
                </div>
              </div>

              <div className="col-auto">
                <div className="footer__images d-flex items-center x-gap-10">
                  <Paymentcards />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
