/* eslint-disable react/prop-types */
import Card from '../Card/Card';

const Home = ({
  items,
  searchValue,
  setSearchValue,
  onAddToCart,
  onAddToFavorites,
  onChangeSearchInput,
}) => {
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
    </div>
  );
};

export default Home;
