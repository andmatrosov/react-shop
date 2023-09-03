/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './Card.module.scss';

const Card = ({ title, price, imgUrl, onFavorite, onPlus }) => {
  const formatedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const onClickPlus = () => {
    setIsAdded(!isAdded);
    onPlus();
  };

  const onClickFavorite = () => {
    onFavorite();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? '/svg/heart-liked.svg' : '/svg/heart-unliked.svg'}
          alt="Unliked"
        />
      </div>
      <img width={133} height={112} src={imgUrl} alt="" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{formatedPrice} руб.</b>
        </div>

        <img
          className={styles.plus}
          onClick={() => onClickPlus()}
          width={32}
          height={32}
          src={isAdded ? '/svg/btn-checked.svg' : '/svg/btn-plus.svg'}
          alt="Plus"
        />
      </div>
    </div>
  );
};

export default Card;
