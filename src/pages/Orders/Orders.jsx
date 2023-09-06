import React from 'react';

const Orders = ({ items }) => {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap gap-20 sneakers">
        {items.map((item, indx) => (
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

export default Orders;
