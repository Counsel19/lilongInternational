import { useState } from "react";
import Image from "next/image";
import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import StoryStyles from "../../styles/home/Stories.module.css";

const Stories = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index === 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
    setShowOverlay(true)
  };
  const handleBack = () => {
    if (index === 0) {
      setIndex(1);
    } else {
      setIndex(index - 1);
    }
    setShowOverlay(true)
  };

  return (
    <div className={StoryStyles.container}>
      <h2>Successfull Stories</h2>
      <div className={StoryStyles.wrapper}>
        <div
          className={StoryStyles.story}
          style={index === 0 ? { opacity: "1" } : { opacity: "0" }}
        >
          <div className={StoryStyles.left}>
            <h3>Mr. John Doe Story</h3>

            <h4>A Cancer Survivor</h4>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
              repudiandae eligendi eaque blanditiis deserunt veniam odit,
              possimus magnam excepturi obcaecati rem unde at saepe tempora
              voluptas neque illo suscipit quo
              {showOverlay && (
                <span onClick={() => setShowOverlay(false)}>
                  ...Continue Reading
                </span>
              )}
            </p>
            <div className={StoryStyles.otherDetails}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
                repudiandae eligendi eaque blanditiis deserunt veniam odit,
                possimus magnam excepturi obcaecati rem unde at saepe tempora
                voluptas neque illo suscipit quo!
              </p>

              <p>
                possimus magnam excepturi obcaecati rem unde at saepe tempora
                voluptas neque illo suscipit quo!
              </p>
              {showOverlay && <div className={StoryStyles.overlay}></div>}
            </div>
          </div>
          <div className={StoryStyles.right}>
            <div className={StoryStyles.imgContainer}>
              <Image
                src="/images/survivor.jpg"
                alt="Success Story"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>

        <div
          className={StoryStyles.story}
          style={index === 1 ? { opacity: "1" } : { opacity: "0" }}
        >
          <div className={StoryStyles.left}>
            <h3>Mrs. Dorathy James Story</h3>

            <h4>Overweight Loss Weight</h4>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
              repudiandae eligendi eaque blanditiis deserunt veniam odit,
              possimus magnam excepturi obcaecati rem unde at saepe tempora
              voluptas neque illo suscipit quo
              {showOverlay && (
                <span onClick={() => setShowOverlay(false)}>
                  ...Continue Reading
                </span>
              )}
            </p>
            <div className={StoryStyles.otherDetails}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
                repudiandae eligendi eaque blanditiis deserunt veniam odit,
                possimus magnam excepturi obcaecati rem unde at saepe tempora
                voluptas neque illo suscipit quo!
              </p>

              <p>
                possimus magnam excepturi obcaecati rem unde at saepe tempora
                voluptas neque illo suscipit quo!
              </p>
              {showOverlay && <div className={StoryStyles.overlay}></div>}
            </div>
          </div>
          <div className={StoryStyles.right}>
            <div className={StoryStyles.imgContainer}>
              <Image
                src="/images/success-weight-loss.jpg"
                alt="Success Story"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className={StoryStyles.controls}>
          <IoCaretBackOutline
            className={StoryStyles.icon}
            onClick={handleBack}
          />
          <span></span>
          <IoCaretForwardOutline
            className={StoryStyles.icon}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default Stories;
