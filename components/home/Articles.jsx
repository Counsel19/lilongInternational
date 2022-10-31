import Image from "next/image";
import ArticleStyles from "../../styles/home/Articles.module.css";
import { BsForward, BsTagsFill } from "react-icons/bs";

const Articles = () => {
  return (
    <div className={ArticleStyles.container}>
      <h2>Our Latest News and Articles</h2>

      <div className={ArticleStyles.wrapper}>
        <article>
          <div className={ArticleStyles.imgWrapper}>
            <Image
              src="/images/food.jpg"
              alt="Proper Diet"
              layout="fill"
              objectFit="cover"
              className={ArticleStyles.imgHover}
            />
          </div>

          <div className={ArticleStyles.details}>
            <div className={ArticleStyles.headings}>
              <span>
                <BsTagsFill /> Feeding
              </span>
              <h3>Effective Healthy Diets</h3>
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              iste illo blanditiis velit...
            </p>

            <button>
              Read More <BsForward className={ArticleStyles.icon} />
            </button>
          </div>
        </article>
        <article>
          <div className={ArticleStyles.imgWrapper}>
            <Image
              src="/images/infrared-someone.jpg"
              alt="Infrared Suana"
              layout="fill"
              objectFit="cover"
              className={ArticleStyles.imgHover}
            />
          </div>

          <div className={ArticleStyles.details}>
            <div className={ArticleStyles.headings}>
              <span>
                <BsTagsFill /> Treatment
              </span>
              <h3>Using the Infrared Suana</h3>
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              iste illo blanditiis velit...
            </p>

            <button>
              Read More <BsForward className={ArticleStyles.icon} />
            </button>
          </div>
        </article>
        <article>
          <div className={ArticleStyles.imgWrapper}>
            <Image
              src="/images/weight-loss.jpg"
              alt="Weight Loss"
              layout="fill"
              objectFit="cover"
              className={ArticleStyles.imgHover}
            />
          </div>

          <div className={ArticleStyles.details}>
            <div className={ArticleStyles.headings}>
              <span>
                <BsTagsFill /> Body
              </span>
              <h3>How to Acheive Weight Loss</h3>
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
              iste illo blanditiis velit...
            </p>

            <button>
              Read More <BsForward className={ArticleStyles.icon} />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Articles;
