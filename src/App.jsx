import { useEffect, useState } from 'react';
import './App.scss';
import Card from './сomponents/Card/Card';
import Drawer from './сomponents/Drawer/Drawer';
import Header from './сomponents/Header/Header';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch('https://64f35cb5edfa0459f6c68724.mockapi.io/Items')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onCLoseCart={() => setCartOpened(false)} />
      )}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/svg/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-20 sneakers">
          {items.map((item, indx) => (
            <Card
              imgUrl={item.img}
              price={item.price}
              title={item.title}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={() => onAddToCart(item)}
              key={indx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
