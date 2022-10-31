import Image from "next/image";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";
import PCTAStyles from "../../styles/singleProduct/PurchaseCTA.module.css";

const PurchaseCTA = ({ product }) => {
  return (
    <div className={PCTAStyles.container}>
      <div className={PCTAStyles.imageWrapper}>
        <Image
          src={product.images[0]}
          alt={product.name}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={PCTAStyles.details}>
        <h3>{product.name}</h3>
        <div className={PCTAStyles.price}>
          <h4>${product.price}</h4>
          <span>${product.actualPrice}</span>
        </div>

        <Link href="/shop/checkout">
          <a>
            <button>
              <BsCart3 className={PurchaseCTA.icon} /> Buy Now
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PurchaseCTA;
