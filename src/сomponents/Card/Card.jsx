/* eslint-disable react/prop-types */
import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import AppContext from '../../context';
import { useContext } from 'react';

const Card = ({
  onFavorite,
  onPlus,
  loading = false,
  title,
  price = '',
  img,
  article,
}) => {
  const formatedPrice = loading
    ? null
    : price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  const { isItemAdded, isItemFavorite } = useContext(AppContext);

  const onClickPlus = () => {
    onPlus();
  };

  const onClickFavorite = () => {
    onFavorite();
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={265}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="150" />
          <rect x="0" y="166" rx="10" ry="10" width="150" height="15" />
          <rect x="0" y="191" rx="10" ry="10" width="100" height="15" />
          <rect x="0" y="236" rx="10" ry="10" width="80" height="24" />
          <rect x="118" y="228" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            {onFavorite && (
              <img
                src={
                  isItemFavorite(article)
                    ? 'svg/heart-liked.svg'
                    : 'svg/heart-unliked.svg'
                }
                alt="Favorite"
              />
            )}
          </div>
          <img width="100%" height={135} src={img} alt="" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{formatedPrice} руб.</b>
            </div>

            {onPlus && (
              <img
                className={styles.plus}
                onClick={() => onClickPlus()}
                width={32}
                height={32}
                src={
                  isItemAdded(article)
                    ? 'svg/btn-checked.svg'
                    : 'svg/btn-plus.svg'
                }
                alt="Cart"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
