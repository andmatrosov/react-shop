/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import Card from '../../сomponents/Card/Card';
import { useContext } from 'react';
import AppContext from '../../context';

const Favorites = ({ onAddToFavorites }) => {
  const onClickFavorites = (obj) => {
    onAddToFavorites(obj);
  };

  const { favorites, isItemFavorite } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <div className="d-flex align-center">
          <Link to="/" className="mr-20">
            <img
              width={32}
              height={32}
              className="d-block m-0"
              src="/svg/back-arrow.svg"
              alt=""
            />
          </Link>
          <h1>Избранное</h1>
        </div>
      </div>
      <div className="d-flex flex-wrap gap-20 sneakers">
        {favorites.length > 0 ? (
          favorites.map((item, indx) => (
            <Card
              onFavorite={() => onClickFavorites(item)}
              key={`CardKey_${indx}`}
              favorited={true}
              {...item}
            />
          ))
        ) : (
          <h1>Купи слона</h1>
        )}
      </div>
    </div>
  );
};

export default Favorites;
