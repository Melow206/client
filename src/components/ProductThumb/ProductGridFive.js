import { Fragment, useState } from "react";
import Link from "next/link";
import ProductModal from "./elements/ProductModal";
import { ProductRating } from "../Product";

const ProductGridFive = ({
  product,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  compareItem,
  bottomSpace,
  addToCart,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare,
  addToast,
  cartItems,
  sliderClass,
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <div
        className={`${sliderClass ? sliderClass : ""} ${
          bottomSpace ? bottomSpace : ""
        }`}
      >
        <div className="product-grid product-grid--style-three">
          <div className="product-grid__image">
            <Link
              href={`/product/${product.slug}`}
              as={"/product/" + product.slug}
            >
              <a>
                <img src={product.thumb_image[0].url} alt="product_img1" />
                {product.thumb_image.length > 1 && (
                  <img
                    className="product-hover-image"
                    src={colorImage ? colorImage : product.thumb_image[1].url}
                    alt="product_img1"
                  />
                )}
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
                  {product.affiliateLink ? (
                    <a href={product.affiliateLink} target="_blank">
                      <i className="icon-action-redo" />
                    </a>
                  ) : product.variation && product.variation.length >= 1 ? (
                    <Link
                      href={`/shop/product-basic/[slug]?slug=${product.slug}`}
                      as={"/shop/product-basic/" + product.slug}
                    >
                      <a>
                        <i className="icon-wrench" />
                      </a>
                    </Link>
                  ) : product.stock && product.stock > 0 ? (
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
                <li>
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
                </li>
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
                href={`/shop/product-basic/[slug]?slug=${product.slug}`}
                as={"/shop/product-basic/" + product.slug}
              >
                <a>{product.name}</a>
              </Link>
            </h6>
            <div className="product-price">
              {product.discount ? (
                <Fragment>
                  <span className="price">${discountedPrice}</span>
                  <del>${productPrice}</del>
                  <span className="on-sale">{product.discount}% Off</span>
                </Fragment>
              ) : (
                <span className="price">${productPrice}</span>
              )}
            </div>
            <div className="rating-wrap">
              <ProductRating ratingValue={product.rating} />
              <span className="rating-num">({product.ratingCount})</span>
            </div>
          </div>
        </div>
      </div>
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
        compareitem={compareItem}
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

export default ProductGridFive;
