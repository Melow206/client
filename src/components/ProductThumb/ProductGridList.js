import { Fragment, useState } from "react";
import Link from "next/link";
import { Col } from "react-bootstrap";
import ProductModal from "./elements/ProductModal";
import { ProductRating } from "../Product";
import { getPercentDiscount } from '../../lib/product';
import { useEffect } from "react";
import { getBlobSrc } from "../../common/helper";

const ProductGridList = ({
  product,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  // compareItem,
  bottomSpace,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare,
  addToast,
  cartItems,
  sliderClass
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [colorImage, setColorImage] = useState("");
  const [imagesSrc, setImagesSrc] = useState([]);

  useEffect(async ()=>{
    setImagesSrc(await Promise.all(product.thumb_image.map(async (img) => {
      return await getBlobSrc(img.url)
    })));
  }, [])
  return (
    <Fragment>
      <Col
        lg={4}
        sm={6}
        className={`${sliderClass ? sliderClass : ""} ${
          bottomSpace ? bottomSpace : ""
        }`}
      >
        <div className="product-grid">
          <div className="product-grid__image">
            <Link
              href={`/product/[slug]?slug=${product.slug}`}
              as={"/product/" + product.slug}
            >
              <a>{
                  product.thumb_image?.[0] && (product.thumb_image[0].type === "image" ? (<img
                  src={colorImage ? colorImage : imagesSrc[0]}
                  alt="product_img1"
                />) : (<video controls>
                  <source src={colorImage ? colorImage : imagesSrc[0]}/>

                </video>))
                }
                
              </a>
            </Link>
            <div className="product-grid__badge-wrapper">
              {product.new ? <span className="pr-flash">NEW</span> : ""}
              {product.featured ? (
                <span className="pr-flash bg-danger">HOT</span>
              ) : (
                ""
              )}
              {product.discount ? (
                <span className="pr-flash bg-success">SALE</span>
              ) : (
                ""
              )}
            </div>
            <div className="product-grid__action-box">
              <ul>
                <li>
                  {product.slug ? (
                    <a href={product.slug} target="_blank" rel="noreferrer">
                      <i className="icon-action-redo" />
                    </a>
                  ) : product.properties && product.properties.length >= 1 ? (
                    <Link
                      href={`/product/[slug]?slug=${product.slug}`}
                      as={"/product/" + product.slug}
                    >
                      <a>
                        <i className="icon-wrench" />
                      </a>
                    </Link>
                  ) : product.quantity > product.sale_count ? (
                    <button
                      onClick={() => addToCart(product, addToast)}
                      disabled={
                        cartItem !== undefined &&
                        cartItem.quantity >= cartItem.stock
                      }
                      className={cartItem !== undefined ? "active" : ""}
                    >
                      <i className="icon-basket-loaded" />
                    </button>
                  ) : (
                    <button disabled>
                      <i className="icon-basket-loaded" />
                    </button>
                  )}
                </li>
                {/* <li>
                  <button
                    onClick={
                      compareItem !== undefined
                        ? () => deleteFromCompare(product, addToast)
                        : () => addToCompare(product, addToast)
                    }
                    className={compareItem !== undefined ? "active" : ""}
                  >
                    <i className="icon-shuffle" />
                  </button>
                </li> */}
                <li>
                  <button
                    onClick={() => setModalShow(true)}
                    className="d-none d-lg-block"
                  >
                    <i className="icon-magnifier-add" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={
                      wishlistItem !== undefined
                        ? () => deleteFromWishlist(product, addToast)
                        : () => addToWishlist(product, addToast)
                    }
                    className={wishlistItem !== undefined ? "active" : ""}
                  >
                    <i className="icon-heart" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="product-grid__info">
            <h6 className="product-title">
              <Link
                href={`/product/[slug]?slug=${product.slug}`}
                as={"/product/" + product.slug}
              >
                <a>{product.name}</a>
              </Link>
            </h6>
            <div className="product-price">
              {product.discount ? (
                <Fragment>
                  <span className="price">${discountedPrice}</span>
                  <del>${productPrice}</del>
                  <span className="on-sale">{getPercentDiscount(product)}% Off</span>
                </Fragment>
              ) : (
                <span className="price">${productPrice}</span>
              )}
            </div>
            {/* <div className="rating-wrap">
              <ProductRating ratingValue={product.rating} />
              <span className="rating-num">({product.ratingCount})</span>
            </div> */}

            {product.variation ? (
              <div className="product-switch-wrap">
                <ul>
                  {product.variation.map((single, key) => {
                    return (
                      <li key={key}>
                        <button
                          style={{ backgroundColor: `${single.colorCode}` }}
                          onClick={() => setColorImage(single.image)}
                          className={
                            colorImage === single.image ? "active" : ""
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="product-list">
          <div className="product-list__image">
            <Link
              href={`/product/${product.slug}`}
              as={"/product/" + product.slug}
            >
              <a>
                {
                  product.thumb_image?.[0] && (product.thumb_image[0].type === "image" ? (<img
                  src={colorImage ? colorImage : imagesSrc[0]}
                  alt="product_img1"
                />) : (<video controls>
                  <source src={colorImage ? colorImage : imagesSrc[0]}/>

                </video>))
                }
              </a>
            </Link>
            <div className="product-grid__badge-wrapper">
              {product.new ? <span className="pr-flash">NEW</span> : ""}
              {product.featured ? (
                <span className="pr-flash bg-danger">HOT</span>
              ) : (
                ""
              )}
              {product.discount ? (
                <span className="pr-flash bg-success">SALE</span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="product-list__info">
            <h6 className="product-title">
              <Link
                href={`/product/${product.slug}`}
                as={"/product/" + product.slug}
              >
                <a>{product.name}</a>
              </Link>
            </h6>
            <div className="d-flex justify-content-between">
              <div className="product-price">
                {product.discount ? (
                  <Fragment>
                    <span className="price">${discountedPrice}</span>
                    <del>${productPrice}</del>
                    <span className="on-sale">{getPercentDiscount(product)}% Off</span>
                  </Fragment>
                ) : (
                  <span className="price">${productPrice}</span>
                )}
              </div>
              {/* <div className="rating-wrap">
                <ProductRating ratingValue={product.rating} />
                <span className="rating-num">({product.ratingCount})</span>
              </div> */}
            </div>
            <div className="product-description">
              {product.shortDescription}
            </div>
            {product.variation ? (
              <div className="product-switch-wrap">
                <ul>
                  {product.variation.map((single, key) => {
                    return (
                      <li key={key}>
                        <button
                          style={{ backgroundColor: `${single.colorCode}` }}
                          onClick={() => setColorImage(single.image)}
                          className={
                            colorImage === single.image ? "active" : ""
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              ""
            )}
            <div className="product-list__actions">
              <ul>
                <li>
                  {product.slug ? (
                    <a
                      href={product.slug}
                      className="btn btn-fill-out btn-addtocart"
                      target="_blank" rel="noreferrer"
                    >
                      <i className="icon-action-redo" /> Buy Now
                    </a>
                  ) : product.properties && product.properties.length >= 1 ? (
                    <Link
                      href={`/product/[slug]?slug=${product.slug}`}
                      as={"/product/" + product.slug}
                    >
                      <a className="btn btn-fill-out btn-addtocart">
                        <i className="icon-wrench" /> Select Options
                      </a>
                    </Link>
                  ) : product.quantity > product.sale_count ? (
                    <button
                      onClick={() => addToCart(product, addToast)}
                      disabled={
                        cartItem !== undefined &&
                        cartItem.quantity >= cartItem.stock
                      }
                      className={`btn btn-fill-out btn-addtocart ${
                        cartItem !== undefined ? "active" : ""
                      }`}
                    >
                      <i className="icon-basket-loaded" /> Add To Cart
                    </button>
                  ) : (
                    <button disabled className="btn btn-fill-out btn-addtocart">
                      <i className="icon-basket-loaded" /> Add To Cart
                    </button>
                  )}
                </li>
                {/* <li>
                  <button
                    onClick={
                      compareItem !== undefined
                        ? () => deleteFromCompare(product, addToast)
                        : () => addToCompare(product, addToast)
                    }
                    className={compareItem !== undefined ? "active" : ""}
                  >
                    <i className="icon-shuffle" />
                  </button>
                </li> */}
                <li>
                  <button
                    onClick={() => setModalShow(true)}
                    className="d-none d-lg-block"
                  >
                    <i className="icon-magnifier-add" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={
                      wishlistItem !== undefined
                        ? () => deleteFromWishlist(product, addToast)
                        : () => addToWishlist(product, addToast)
                    }
                    className={wishlistItem !== undefined ? "active" : ""}
                  >
                    <i className="icon-heart" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Col>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        discountedprice={discountedPrice}
        productprice={productPrice}
        cartitems={cartItems}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        // compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        deletefromwishlist={deleteFromWishlist}
        addtocompare={addToCompare}
        deletefromcompare={deleteFromCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

export default ProductGridList;
