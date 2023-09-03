const Header = (props) => {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img className="mr-15" width={40} height={40} src="img/logo.png" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={() => props.onClickCart()}>
          <img width={18} height={18} src="/svg/cart.svg" alt="Корзина" />
          <span className="ml-15">1205 руб.</span>
        </li>
        <li className="mr-30 cu-p">
          <img width={18} height={18} src="/svg/favorite.svg" alt="Избранное" />
        </li>
        <li className="mr-30 cu-p">
          <img width={18} height={18} src="/svg/user.svg" alt="Профиль" />
        </li>
      </ul>
    </header>
  );
};

export default Header;
