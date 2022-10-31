import PDescriptionStyles from "../../styles/singleProduct/ProductDescription.module.css";
import parse from "html-react-parser";

const ProductDescription = ({ product }) => {
  return (
    <div className={PDescriptionStyles.container}>
      <div className={PDescriptionStyles.spec}>
        <h3>Product Specification</h3>
        <table className={PDescriptionStyles.specDetails}>
          <thead>
            <tr>
              <th>Specification Title</th>
              <th>Specification Details</th>
            </tr>
          </thead>
          <tbody>
            {product.specification.map((item) => (
              <tr key={`${item.title}-${Math.floor(Math.random() * 100)}`}>
                <td>{item.title}</td>
                <td>{item.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={PDescriptionStyles.productDetails}>
        <div className={PDescriptionStyles.features}>
          <h3>Features</h3>
          <div className={PDescriptionStyles.listItems}>
            {parse(product.features)}
          </div>
        </div>

        <div className={PDescriptionStyles.benefits}>
          <h3>Benefits</h3>
          <div className={PDescriptionStyles.listItems}>
            {parse(product.benefits)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
