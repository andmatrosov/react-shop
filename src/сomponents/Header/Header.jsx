import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const Header = (props) => {
  const { totalPriceFormated } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img className="mr-15" width={40} height={40} src="img/logo.png" />
          <div>
            <h3 className="text-uppercase">Sneaker shop</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={() => props.onClickCart()}>
          <img width={18} height={18} src="/svg/cart.svg" alt="Корзина" />
          <span className="ml-15">{totalPriceFormated()} руб.</span>
        </li>
        <li className="mr-30 cu-p">
          <Link to="/favorites">
            <img
              width={18}
              height={18}
              src="/svg/favorite.svg"
              alt="Избранное"
            />
          </Link>
        </li>
        <li className="mr-30 cu-p">
          <Link to="/orders">
            <img width={18} height={18} src="/svg/user.svg" alt="Профиль" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
