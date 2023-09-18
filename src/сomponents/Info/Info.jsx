import { useContext } from 'react';
import AppContext from '../../context';
import { useNavigate } from 'react-router-dom';

const Info = ({ title, image, description, isDrawer = false }) => {
  const { setCartOpened } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    isDrawer ? setCartOpened(false) : navigate('/react-shop/');
  };

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width={isDrawer ? 120 : 70}
        src={image}
        alt="Empty"
      />
      <h2>{title}</h2>
      <p className="opacity-6 mt-10">{description}</p>
      <button onClick={onClickHandler} className="greenButton">
        <img src="svg/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
