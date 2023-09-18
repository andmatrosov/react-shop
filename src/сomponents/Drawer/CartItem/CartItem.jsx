/* eslint-disable react/prop-types */

const CartItem = ({ title, price, imgUrl, onRemoveClick }) => {
  const formatedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <div className="cartItem d-flex align-center mb-20 ">
      <div
        style={{ backgroundImage: `url(${imgUrl})` }}
        className="cartItemImg"
      ></div>
      <div className="mr-20 flex">
        <p className="mb-5">{title}</p>
        <b>{formatedPrice} руб.</b>
      </div>
      <img
        className="removeBtn"
        onClick={() => onRemoveClick()}
        src="svg/btn-remove.svg"
        alt="Remove"
      />
    </div>
  );
};

export default CartItem;
