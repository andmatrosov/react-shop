import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import Drawer from './сomponents/Drawer/Drawer';
import Header from './сomponents/Header/Header';
import Home from './сomponents/Home/Home';
import Favorites from './сomponents/Favorites/Favorites';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoritesItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios
      .get('https://64f35cb5edfa0459f6c68724.mockapi.io/Items')
      .then((res) => setItems(res.data));

    axios
      .get('https://64f35cb5edfa0459f6c68724.mockapi.io/cart')
      .then((res) => setCartItems(res.data));

    axios
      .get('https://64f50563932537f4051ad771.mockapi.io/favorites')
      .then((res) => setFavoritesItems(res.data));
  }, []);

  const onAddToCart = (item) => {
    axios
      .post('https://64f35cb5edfa0459f6c68724.mockapi.io/cart', item)
      .then((res) => {
        setCartItems((prev) => [...prev, res.data]);
      });
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://64f35cb5edfa0459f6c68724.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorites = (item) => {
    axios
      .post('https://64f50563932537f4051ad771.mockapi.io/favorites', item)
      .then((res) => setFavoritesItems((prev) => [...prev, res.data]));
  };

  const onRemoveFavorites = (id) => {
    axios.delete(`https://64f50563932537f4051ad771.mockapi.io/favorites/${id}`);
    setFavoritesItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onRemove={(id) => onRemoveItem(id)}
          onCLoseCart={() => setCartOpened(false)}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              setItems={setItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              favoriteItems={favoriteItems}
              setFavoritesItems={setFavoritesItems}
              onAddToCart={onAddToCart}
              onRemoveItem={onRemoveItem}
              onAddToFavorites={onAddToFavorites}
              onChangeSearchInput={onChangeSearchInput}
            />
          }
          exact
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favoriteItems={favoriteItems}
              onRemoveFavorites={onRemoveFavorites}
            />
          }
        />
      </Routes>
      {/* <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue
              ? `Поиск по запросу: "${
                  searchValue.length > 20
                    ? searchValue.slice(0, 15) + '...'
                    : searchValue
                }"`
              : 'Все кроссовки'}
          </h1>
          <div className="search-block">
            <img src="/svg/search.svg" alt="Search" />
            {searchValue && (
              <img
                className="clear cu-p"
                src="/svg/btn-remove.svg"
                alt="Close"
                onClick={() => setSearchValue('')}
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-20 sneakers">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, indx) => (
              <Card
                imgUrl={item.img}
                price={item.price}
                title={item.title}
                onFavorite={() => onAddToFavorites(item)}
                onPlus={() => onAddToCart(item)}
                key={`CardKey_${indx}`}
              />
            ))}
        </div>
      </div> */}
    </div>
  );
}

export default App;
