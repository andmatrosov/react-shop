import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../сomponents/Card/Card';
import axios from 'axios';
import Info from '../../сomponents/Info/Info';

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, serOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://64f50563932537f4051ad771.mockapi.io/orders'
        );
        serOrders(data.reduce((prev, cur) => [...prev, cur.items], []));
        setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.log(error);
      }
    })();
  }, []);

  const renderItems = () => {
    return (isLoading ? [...Array(8)] : orders.flat()).length > 0 ? (
      orders
        .flat()
        .map((item, indx) => <Card key={indx} loading={isLoading} {...item} />)
    ) : (
      <Info
        title="Нет ни одного заказа :("
        description="Вы что нищеброд? Закажите хоть что-нибудь!"
        image="img/emoji-poor.png"
      />
    );
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <div className="d-flex align-center">
          <Link to="/react-shop/" className="mr-20">
            <img
              width={32}
              height={32}
              className="d-block m-0"
              src="svg/back-arrow.svg"
              alt=""
            />
          </Link>
          <h1>Мои заказы</h1>
        </div>
      </div>
      <div className="d-flex flex-wrap gap-20 orders">{renderItems()}</div>
    </div>
  );
};

export default Orders;
