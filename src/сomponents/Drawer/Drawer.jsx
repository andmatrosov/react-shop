/* eslint-disable react/prop-types */
import CartItem from './CartItem/CartItem';
import styles from './Drawer.module.scss';

import AppContext from '../../context';
import { useContext } from 'react';

const Drawer = ({ onCLoseCart, onRemove }) => {
  const { cartItems = [] } = useContext(AppContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            className="removeBtn cu-p"
            src="/svg/btn-remove.svg"
            alt="Close"
            onClick={() => onCLoseCart()}
          />
        </h2>

        {cartItems.length > 0 ? (
          <>
            <div className={styles.items}>
              {cartItems.map((item, indx) => (
                <CartItem
                  title={item.title}
                  imgUrl={item.img}
                  price={item.price}
                  key={`CartItem_${indx}`}
                  onRemoveClick={() => onRemove(item)}
                />
              ))}
            </div>
            <div className={styles.cartTotalBlock}>
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
              <button className={styles.greenButton}>
                Оформить заказ
                <img src="/svg/arrow.svg" width={16} height={14} alt="" />
              </button>
            </div>
          </>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              width="120px"
              height="120px"
              src="/svg/empty-cart.svg"
              alt="Empty"
            />
            <h2>Корзина пустая</h2>
            <p className="opacity-6">
              Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
            </p>
            <button onClick={onCLoseCart} className="greenButton">
              <img src="/svg/arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
