import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import Drawer from './сomponents/Drawer/Drawer';
import Header from './сomponents/Header/Header';
import Home from './pages/Home/Home';
import Favorites from './pages/Favorites/Favorites';
import Orders from './pages/Orders/Orders';
import AppContext from './context';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favorites, itemsResponse] = await Promise.all([
          axios.get('https://64f35cb5edfa0459f6c68724.mockapi.io/cart'),
          axios.get('https://64f50563932537f4051ad771.mockapi.io/favorites'),
          axios.get('https://64f35cb5edfa0459f6c68724.mockapi.io/Items'),
        ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favorites.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при получении списка товаров');
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = (item) => {
    if (cartItems.find((obj) => Number(obj.article) === Number(item.article))) {
      const targetObj = cartItems.find((i) => i.article === item.article);
      axios.delete(
        `https://64f35cb5edfa0459f6c68724.mockapi.io/cart/${targetObj.id}`
      );
      setCartItems((prev) =>
        prev.filter((obj) => Number(obj.article) !== Number(item.article))
      );
    } else {
      axios
        .post('https://64f35cb5edfa0459f6c68724.mockapi.io/cart', item)
        .then((res) => {
          setCartItems((prev) => [...prev, res.data]);
        });
    }
  };

  const onAddToFavorites = async (item) => {
    try {
      if (favorites.find((obj) => item.article === obj.article)) {
        const targetObj = favorites.find((i) => i.article === item.article);
        await axios.delete(
          `https://64f50563932537f4051ad771.mockapi.io/favorites/${targetObj.id}`
        );
        setFavorites((prev) =>
          prev.filter((favObj) => favObj.article !== item.article)
        );
      } else {
        const { data } = await axios.post(
          'https://64f50563932537f4051ad771.mockapi.io/favorites',
          item
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось обновить список избранного');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (article) => {
    return cartItems.some((obj) => Number(obj.article) === Number(article));
  };

  const isItemFavorite = (article) => {
    return favorites.some((obj) => Number(obj.article) === Number(article));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorite,
        onAddToCart,
        onAddToFavorites,
        setCartOpened,
        setCartItems,
        orderItems,
        setOrderItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onRemove={(item) => onAddToCart(item)}
          onCloseCart={() => setCartOpened(false)}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                favoriteItems={favorites}
                setFavoritesItems={setFavorites}
                onAddToCart={onAddToCart}
                cartItems={cartItems}
                onAddToFavorites={onAddToFavorites}
                onChangeSearchInput={onChangeSearchInput}
                isLoading={isLoading}
              />
            }
            exact
          />
          <Route
            path="/favorites"
            element={<Favorites onAddToFavorites={onAddToFavorites} />}
          />

          <Route path="/orders" exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
