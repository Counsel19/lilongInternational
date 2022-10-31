import BannerStyles from "../../styles/home/Banner.module.css";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div className={BannerStyles.container}>
      <div className={BannerStyles.left}>
        <h1>
          Good Health <br />
          Assured
        </h1>

        <div className={BannerStyles.btns}>
         <Link href="/products"><a> <button className={BannerStyles.btn1}>Buy Products</button></a></Link>
         <Link href="/become-an-affiliate"><a> <button className={BannerStyles.btn2}>Become an Affiliate</button></a></Link>
          
        </div>
      </div>
      <div className={BannerStyles.right}>
        <div className={BannerStyles.backdrop}></div>
        <div className={BannerStyles.imgContainer}>
          <Image
            src="/images/lilong_products.png"
            alt="Lilong Products"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

    </div>
  );
};

export default Banner;
