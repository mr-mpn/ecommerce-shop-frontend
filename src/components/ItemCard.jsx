import './ItemCard.css';

/**
 * ItemCard component to display individual item
 * @param {Object} props
 * @param {Object} props.item - The item to display
 */
const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <div className="item-image">
        <img 
          src={item.image_url} 
          alt={item.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
      </div>
      <div className="item-content">
        <h3 className="item-name">{item.name}</h3>
        {/*<h3 className="item-name">{item.category}</h3>*/}
        <p className="item-description">{item.description}</p>
        <div className="item-price">
          <span className="price">{item.price}</span>
          <span className="currency">{item.currency === 'USD' && '$'}</span>
          <span className="currency">{item.currency === 'EUR' && '€'}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;