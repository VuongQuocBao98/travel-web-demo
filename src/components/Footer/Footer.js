import React from "react";

import Iframe from "react-iframe";
import Marquee from "react-fast-marquee";

Footer.propTypes = {};

function Footer(props) {
  return (
    <footer className="container-fluid">
      <div className="container">
        <div id="footer-top" className="row">
          {/* ABOUT-ME  */}
          <div id="footer-about-me" className="col-12 col-sm-6 col-md-3">
            <h3>VỀ CHÚNG TÔI</h3>
            <p>
              <i className="fas fa-envelope" /> : vuongquocbao98@gmai.com
            </p>
            <p>
              <i className="fas fa-phone-square-alt" /> : 0975774662
            </p>
            <p>
              <i className="fas fa-map-marked-alt" /> : Cát Hanh - Phù Cát -
              Bình Định
            </p>
          </div>
          {/* CATEGORY  */}
          <div id="footer-category" className="col-12 col-sm-6 col-md-3">
            <h3>DANH MỤC</h3>
            <p>
              <i className="fas fa-user-tie" /> : Tác Giả
            </p>
            <p>
              <i className="fas fa-plane" /> : Du Lịch
            </p>
            <p>
              <i className="fas fa-share-alt-square" /> : Chia Sẻ
            </p>
          </div>
          {/* SOCIAL MEDIA  */}
          <div id="footer-social-media" className="col-12 col-sm-6 col-md-3">
            <h3>Mạng Xã Hội</h3>
            <p>
              <i className="fab fa-facebook" /> -
              <a href="https://www.facebook.com/bao.vuong.15.11">Bảo Vương</a>
            </p>
            <p>
              <i className="fab fa-instagram-square" /> -
              <a href="https://www.instagram.com/baovuong1511/">baovuong1511</a>
            </p>
            <p>
              <i className="fab fa-twitter-square" /> - baovuong98
            </p>
          </div>
          {/* FACEBOOK MEDIA  */}
          <div id="footer-facebook-media" className="col-12 col-sm-6 col-md-3">
            <Iframe
              className="rounded"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftourdulichquynhonbinhdinh&tabs=timeline&width=280&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=335064390849476"
              width={280}
              height={130}
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-warning text-uppercase">
            <Marquee speed="50">CopyRight vuongquocbao98@gmail.com</Marquee>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
