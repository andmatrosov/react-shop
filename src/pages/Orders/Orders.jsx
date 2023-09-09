import { Link } from 'react-router-dom';
const Orders = ({ items = [] }) => {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <div className="d-flex align-center">
          <Link to="/" className="mr-20">
            <img
              width={32}
              height={32}
              className="d-block m-0"
              src="/svg/back-arrow.svg"
              alt=""
            />
          </Link>
          <h1>Мои заказы</h1>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-20 sneakers">
        {items.map((item, indx) => (
          <Card
            imgUrl={item.img}
            price={item.price}
            title={item.title}
            key={`CardKey_${indx}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
