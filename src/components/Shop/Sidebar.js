import { Fragment, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import {
  getIndividualCategories,
  getIndividualTags,
  getIndividualColors,
  getProductsIndividualSizes,
  setActiveSort,
} from "../../lib/product";

const Sidebar = ({ banner, products, viewCategory }) => {
  const categories = getIndividualCategories(products);
  const colors = getIndividualColors(products);
  const sizes = getProductsIndividualSizes(products);
  const tags = getIndividualTags(products);

  // const popularProducts = getProducts(products, "fashion", "popular", 3);
  return (
    <div className="sidebar">
      <div className="widget">
        <h5 className="widget__title">Categories</h5>
        {categories.length > 0 ? (
          <ul className="widget__categories">
            {categories &&
              categories.map((category, key) => {
                return (
                  <li key={key}>
                    <button
                      onClick={(e) => {
                        viewCategory(category)
                        setActiveSort(e);
                      }}
                    >
                      <IoIosArrowForward />
                      <span className="categories-name">{category.name}</span>
                      <span className="categories-num">({category.count})</span>
                    </button>
                  </li>
                );
              })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>

      {/* <div className="widget">
        <h5 className="widget__title">Popular Items</h5>
        {popularProducts.length > 0 ? (
          <ul className="widget-recent-post-wrapper">
            {popularProducts &&
              popularProducts.map((product, key) => {
                const discountedPrice = getDiscountPrice(
                  product.selling_price,
                  product.discount
                ).toFixed(2);
                const productPrice = product.selling_price.toFixed(2);
                return (
                  <li className="widget-product-post" key={key}>
                    <div className="widget-product-post__image">
                      <Link
                        href={`/product/[slug]?slug=${product.slug}`}
                        as={"/product/" + product.slug}
                      >
                        <a>
                          <img src={product.thumb_image[0].url} alt="shop_small1" />
                        </a>
                      </Link>
                    </div>
                    <div className="widget-product-post__content">
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
                          </Fragment>
                        ) : (
                          <span className="price">${productPrice}</span>
                        )}
                      </div>
                      <div className="rating-wrap">
                        <ProductRating ratingValue={product.rating} />
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        ) : (
          "No products found"
        )}
      </div> */}

      {/* <div className="widget">
        <h5 className="widget__title">tags</h5>
        {tags.length > 0 ? (
          <div className="widget__tags">
            {tags &&
              tags.map((tag, key) => {
                return (
                  <button
                    key={key}
                    onClick={(e) => {
                      getSortParams("tag", tag);
                      setActiveSort(e);
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
          </div>
        ) : (
          "No tags found"
        )}
      </div> */}

      <div className="widget">
        <div className="shop-banner">
          <div className="banner-img">
            <img src={banner.image} alt="sidebar_banner_img" />
          </div>
          <div className="shop-bn-content2">
            <h5 className="text-uppercase shop-subtitle">{banner.title2}</h5>
            <h3 className="text-uppercase shop-title">{banner.title}</h3>
            <Link href={banner.redirect_url ?? ""}>
              <a className="btn btn-white rounded-0 btn-sm text-uppercase">
                Shop Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
