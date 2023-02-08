import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HeroSliderSix = ({ heroSliderData }) => {
  const params = {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    watchSlidesVisibility: true,
    effect: "creative",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <FiChevronLeft />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <FiChevronRight />
      </button>
    )
  };
  return (
    <div className="hero-slider space-pb--50">
      <div className="hero-slider__wrapper">
        <Swiper {...params}>
          {heroSliderData &&
            heroSliderData.map((element, key) => {
              return (
                <div
                  className="hero-slider__slide bg-image"
                  style={{ backgroundImage: `url(${element.image})` }}
                  key={key}
                >
                  <div className="hero-slider__content-wrapper">
                    <Container>
                      <Row>
                        <Col lg={6}>
                          <div className="hero-slider__content overflow-hidden">
                            <h5 className="mb-3 font-weight-light sub-title">
                              {element.title2}
                            </h5>
                            <h2 className="space-mb--20 title">
                              {element.title}
                            </h2>
                            <Link href={element.redirect_url ?? ""}>
                              <a className="btn btn-fill-out rounded-0 text-uppercase slider-link">
                                Buy Now
                              </a>
                            </Link>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderSix;
