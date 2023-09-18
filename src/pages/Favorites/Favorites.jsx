/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import Card from '../../сomponents/Card/Card';
import { useContext } from 'react';
import AppContext from '../../context';
import Info from '../../сomponents/Info/Info';

const Favorites = () => {
  const onClickFavorites = (obj) => {
    onAddToFavorites(obj);
  };

  const { favorites, onAddToFavorites, onAddToCart } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <div className="d-flex align-center">
          <Link to="/react-shop/" className="mr-20">
            <img
              width={32}
              height={32}
              className="d-block m-0"
              src="svg/back-arrow.svg"
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
              onPlus={() => onAddToCart(item)}
              {...item}
            />
          ))
        ) : (
          <Info
            title="Закладок нет :("
            description="Вы ничего не добавляли в закладки"
            image="img/emoji-sad.png"
          />
        )}
      </div>
    </div>
  );
};

export default Favorites;
