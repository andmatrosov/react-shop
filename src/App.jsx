import './App.scss';
import Card from './сomponents/Card/Card';
import Drawer from './сomponents/Drawer/Drawer';
import Header from './сomponents/Header/Header';

function App() {
  return (
    <div className="wrapper clear">
      <Header />
      <Drawer />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/svg/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap gap-20 sneakers">
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
