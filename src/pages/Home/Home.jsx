/* eslint-disable react/prop-types */
import Card from '../../сomponents/Card/Card';

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onAddToCart,
  onAddToFavorites,
  onChangeSearchInput,
  isLoading,
  favoriteItems,
}) => {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(8)] : filteredItems).map((item, indx) => (
      <Card
        onFavorite={() => onAddToFavorites(item)}
        onPlus={() => onAddToCart(item)}
        key={indx}
        loading={isLoading}
        favorited={favoriteItems.some(
          (obj) => Number(obj.id) === Number(item.id)
        )}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue
            ? `Поиск по запросу: "${
                searchValue.length > 20
                  ? searchValue.slice(0, 12) + '...'
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

      <div className="d-flex flex-wrap gap-20 sneakers">{renderItems()}</div>
    </div>
  );
};

export default Home;
