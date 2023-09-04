/* eslint-disable react/prop-types */
import { useState } from 'react';
import Card from '../Card/Card';

const Favorites = ({ favoriteItems, onRemoveFavorites }) => {
  const onClickFavorites = (id) => {
    onRemoveFavorites(id);
  };

  console.log(favoriteItems);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Избранное</h1>
      </div>
      <div className="d-flex flex-wrap gap-20 sneakers">
        {favoriteItems.map((item, indx) => (
          <Card
            imgUrl={item.img}
            price={item.price}
            title={item.title}
            onFavorite={() => onClickFavorites(item.id)}
            // onPlus={() => onAddToCart(item)}
            key={`CardKey_${indx}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
