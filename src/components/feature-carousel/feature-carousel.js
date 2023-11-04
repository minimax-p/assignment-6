import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const FeatureCarousel = ({ content }) => {
  const defaultSelectedIndex = 0;
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);
  // eslint-disable-next-line react/prop-types
  const contentLength = content.length;
  const defaultWidth = contentLength > 0 ? `${100 * contentLength}%` : "100%";
  const defaultStyle = { left: "0", width: defaultWidth };
  const [style, setStyle] = useState(defaultStyle);

  const hideLeftArrow = selectedIndex === 0;
  const hideRightArrow = selectedIndex === contentLength - 1;

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (0 <= selectedIndex && selectedIndex < content.length) {
      const left = selectedIndex === 0 ? "0" : `-${selectedIndex * 100}%`;
      setStyle({ left: left, width: defaultWidth });
    } else {
      setStyle(defaultStyle);
    }
  }, [selectedIndex]);

  const handlePrevClick = () => {
    if (selectedIndex === 0) {
      return;
    }
    setSelectedIndex(selectedIndex - 1);
  };

  const handleNextClick = () => {
    // eslint-disable-next-line react/prop-types
    if (selectedIndex >= content.length - 1) {
      return;
    }
    setSelectedIndex(selectedIndex + 1);
  };

  // eslint-disable-next-line react/prop-types
  const paginationDots = content.map((_, index) => (
    <button
      key={index}
      className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${
        selectedIndex === index ? "bg-black" : "bg-gray-400"
      }`}
      onClick={() => setSelectedIndex(index)}
    ></button>
  ));

  // eslint-disable-next-line react/prop-types
  const elements = content.map((c, index) => {
    const { description, imageAlt, imageSrc } = c;
    return (
      <div className="basis-0 grow justify-items-stretch" key={index}>
        <div className="h-36">{description}</div>
        <img alt={imageAlt} src={imageSrc} />
      </div>
    );
  });

  return (
    <div className="flex-col">
      <div className="flex justify-between">
        <div className="flex justify-center items-center pr-2">
          <button
            className={`w-8 h-8 rounded-full cursor-pointer ${
              hideLeftArrow ? "invisible" : "visible"
            } bg-gray-200 hover:bg-slate-100 transition duration-300 flex items-center justify-center`}
            onClick={handlePrevClick}
          >
            <FaChevronLeft />
          </button>
        </div>
        <div className="p-8 bg-slate-50 rounded-xl w-5/6">
          <div className=" overflow-hidden">
            <div
              className="flex relative font-medium text-base text-center transition-[left] duration-300"
              style={style}
            >
              {elements}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pl-2">
          <button
            className={`w-8 h-8 rounded-full cursor-pointer ${
              hideRightArrow ? "invisible" : "visible"
            } bg-gray-200 hover:bg-slate-100 transition duration-300 flex items-center justify-center`}
            onClick={handleNextClick}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div>
        <div className="text-center mt-2">{paginationDots}</div>
      </div>
    </div>
  );
};

export { FeatureCarousel };
