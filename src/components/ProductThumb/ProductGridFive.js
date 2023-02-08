import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import ProductModal from "./elements/ProductModal";
import { ProductRating } from "../Product";
import { getPercentDiscount } from "../../lib/product";
import { getBlobSrc } from "../../common/helper";

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
  const [colorImage, setColorImage] = useState("");
  const [imagesSrc, setImagesSrc] = useState([]);

  useEffect(async ()=>{
    setImagesSrc(await Promise.all(product.thumb_image.map(async (img) => {
      return await getBlobSrc(img.url)
    })));
  }, [])

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
                {product.thumb_image[0].type === "video" ? (
                  <video controls>
                    <source src={imagesSrc[0]} alt="product_img1" />
                  </video>
                ) : (
                  <img src={imagesSrc[0]} alt="product_img1" />
                )}
                {product.thumb_image?.[1]?.type === "video"
                  ? imagesSrc.length > 1 && (
                      <video controls>
                        <source src={imagesSrc[1]} alt="product_img1" />
                      </video>
                    )
                  : imagesSrc.length > 1 && (
                      <img
                        className="product-hover-image"
                        src={colorImage ? colorImage : imagesSrc[1]}
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
                  <Link
                    href={`/product/[slug]?slug=${product.slug}`}
                    as={"/product/" + product.slug}
                  >
                    <a>
                      <i className="icon-basket-loaded" />
                    </a>
                  </Link>
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
                  <span className="on-sale">
                    {getPercentDiscount(product)}% Off
                  </span>
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
        imagesSrc={imagesSrc}
      />
    </Fragment>
  );
};

export default ProductGridFive;
