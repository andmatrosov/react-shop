/* eslint-disable react/prop-types */
import CartItem from './CartItem/CartItem';
import styles from './Drawer.module.scss';

import AppContext from '../../context';
import { useContext, useState } from 'react';
import Info from '../Info/Info';
import axios from 'axios';
import { useCart } from '../../hooks/useCart';

const Drawer = ({ onCloseCart, onRemove, opened }) => {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { setOrderItems, orderItems } = useContext(AppContext);
  const { cartItems, setCartItems, totalPriceFormated } = useCart();

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        'https://64f50563932537f4051ad771.mockapi.io/orders',
        {
          items: cartItems,
          totalPrice: totalPriceFormated(),
        }
      );

      setOrderId(data.id);
      setOrderItems((prev) => [
        prev,
        { id: data.id, items: cartItems, totalPrice: totalPriceFormated },
      ]);
      setIsOrderComplete(true);
      setCartItems([]);
    } catch {
      alert('Не удалось создать заказ');
    }
    setIsLoading(false);

    try {
      const tempCartItems = await axios
        .get('https://64f35cb5edfa0459f6c68724.mockapi.io/cart')
        .then((res) => res.data);

      for (let i = 0; i < tempCartItems.length; i++) {
        const item = tempCartItems[i];
        await axios.delete(
          `https://64f35cb5edfa0459f6c68724.mockapi.io/cart/${item.id}`
        );
      }
    } catch {
      console.warn('Не удалось очистить корзину');
    }
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            className="removeBtn cu-p"
            src="/svg/btn-remove.svg"
            alt="Close"
            onClick={() => onCloseCart()}
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
                  <span>Сумма:</span>
                  <div></div>
                  <b>{totalPriceFormated(0.95, 2)} руб.</b>
                </li>
                <li>
                  <span>НДС 5%:</span>
                  <div></div>
                  <b>{totalPriceFormated(0.05, 2)} руб.</b>
                </li>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPriceFormated()} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className={styles.greenButton}
              >
                Оформить заказ
                <img src="/svg/arrow.svg" width={16} height={14} alt="" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен' : 'Корзина пустая'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={
              isOrderComplete
                ? '/svg/complete-order.svg'
                : '/svg/empty-cart.svg'
            }
            isDrawer
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
