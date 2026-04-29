import { Navigation } from '../../components';
import './Offers.css';

const Offers = () => {
  return (
    <>
      <Navigation />
      <div className="offers-container">
        <div className="offers-content">
          <div className="coming-soon">
            <h2>Coming Soon!</h2>
            <p>We're working on bringing you the best offers and deals.</p>
            <p>Check back soon for exciting promotions and discounts.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offers;