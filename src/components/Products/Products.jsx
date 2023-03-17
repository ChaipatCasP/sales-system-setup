import "./Products.css";
export default function Products(props) {
  const {product} = props;
  return (
      <div className="app-products-item">
        <div className="app-products-item-header">
          <h4>{product.title}</h4>
        </div>
        <div className="app-products-item-details">
          <div>Visit Planned : {product.price}</div>
          <div>Visit Completed : {product.price}</div>

          <br />

          <div>Customers Planned : {product.price}</div>
          <div>Repeating customers : {product.price}</div>

          <br />

          <div>Samples Requested : {product.price}</div>
          <div>Quotations Created :{product.price}</div>
          <div>Quotaion to Sale : {product.price}</div>

          <br />

          <div>Total Sales : {product.image} </div>
        </div>
      </div>
  );
}
