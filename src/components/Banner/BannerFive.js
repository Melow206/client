import Link from "next/link";
import { Row, Col } from "react-bootstrap";

const BannerFive = ({ containerClass, banner }) => {
  return (
    <div className="banner-area space-pb--r70">
      <div className={`${containerClass ? containerClass : "container"}`}>
        <Row>
          {
            banner.map((element,index) => <Col md={4} key={element.id ?? index}>
              <div className="sale-banner px-0">
                <Link href={element.redirect_url ?? "/"}>
                  <a className="hover-effect">
                    <img src={element.image} alt="shop_banner" />
                  </a>
                </Link>
              </div>
            </Col>)
          }
        </Row>
      </div>
    </div>
  );
};

export default BannerFive;
