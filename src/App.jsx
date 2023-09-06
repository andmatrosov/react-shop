import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import Drawer from './сomponents/Drawer/Drawer';
import Header from './сomponents/Header/Header';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import Orders from './pages/Orders/Orders';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [favorite, setFavorite] = useState([]);
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
      .then((res) => setFavorite(res.data));
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

  const onAddToFavorites = async (item) => {
    try {
      if (favorite.find((obj) => item.id === obj.id)) {
        await axios.delete(
          `https://64f50563932537f4051ad771.mockapi.io/favorites/${item.id}`
        );
        setFavorite((prev) => prev.filter((favObj) => favObj.id !== item.id));
      } else {
        const { data } = await axios.post(
          'https://64f50563932537f4051ad771.mockapi.io/favorites',
          item
        );
        setFavorite((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось обновить список избранного');
    }
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
              favoriteItems={favorite}
              setFavoritesItems={setFavorite}
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
              favoriteItems={favorite}
              onAddToFavorites={onAddToFavorites}
              // onRemoveFavorites={onRemoveFavorites}
            />
          }
        />

        <Route
          path="/orders"
          exact
          element={<Orders orderItems={orderItems} />}
        />
      </Routes>
    </div>
  );
}

export default App;
