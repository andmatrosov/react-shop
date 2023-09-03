/* eslint-disable react/prop-types */

const CartItem = (props) => {
  const formatedPrice = props.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return (
    <div className="cartItem d-flex align-center mb-20 ">
      <div
        style={{ backgroundImage: `url(${props.imgUrl})` }}
        className="cartItemImg"
      ></div>
      <div className="mr-20 flex">
        <p className="mb-5">{props.title}</p>
        <b>{formatedPrice} руб.</b>
      </div>
      <img className="removeBtn" src="/svg/btn-remove.svg" alt="Remove" />
    </div>
  );
};

export default CartItem;
