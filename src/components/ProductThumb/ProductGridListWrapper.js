import { Fragment } from "react";

import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../lib/product";
import { addToCart } from "../../redux/actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist
} from "../../redux/actions/wishlistActions";
import {
  addToCompare,
  deleteFromCompare
} from "../../redux/actions/compareActions";
import ProductGridList from "./ProductGridList";

const ProductGridListWrapper = ({
  products,
  bottomSpace,
  addToCart,
  cartItems,
  sliderClass
}) => {
  const { addToast } = useToasts();
  return (
    <Fragment>
      {products &&
        products.length > 0 && 
        products.map((product) => {
          const discountedPrice = getDiscountPrice(
            product.selling_price,
            product.discount
          ).toFixed(2);
          const productPrice = product.selling_price.toFixed(2);
          const cartItem = cartItems.filter(
            (cartItem) => cartItem.id === product.id
          )[0];

          return (
            <ProductGridList
              key={product.id}
              product={product}
              discountedPrice={discountedPrice}
              productPrice={productPrice}
              cartItem={cartItem}
              bottomSpace={bottomSpace}
              addToCart={addToCart}
              addToast={addToast}
              cartItems={cartItems}
              sliderClass={sliderClass}
            />
          );
        })}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    deleteFromWishlist: (item, addToast) => {
      dispatch(deleteFromWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
    deleteFromCompare: (item, addToast) => {
      dispatch(deleteFromCompare(item, addToast));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductGridListWrapper);
