/* eslint-disable react/prop-types */
import CartItem from './CartItem/CartItem';

const Drawer = ({ onCLoseCart, items = [] }) => {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            className="removeBtn cu-p"
            src="/svg/btn-remove.svg"
            alt="Close"
            onClick={() => onCLoseCart()}
          />
        </h2>
        <div className="items">
          {items.map((item) => (
            <CartItem
              title={item.title}
              imgUrl={item.img}
              price={item.price}
              key={Math.random()}
            />
          ))}
          {/* <div className="cartItem d-flex align-center mb-20 ">
            <div
              style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/svg/btn-remove.svg" alt="Remove" />
          </div>
          <div className="cartItem d-flex align-center mb-20 ">
            <div
              style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
              <b>12 999 руб.</b>
            </div>
            <img className="removeBtn" src="/svg/btn-remove.svg" alt="Remove" />
          </div> */}
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>25 998 руб.</b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>1758 руб.</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ
            <img src="/svg/arrow.svg" width={16} height={14} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
