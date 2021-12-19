import React, { useCallback } from "react";
import { CATEGORIES } from "../../constants/category";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./styles.scss";

const Category = ({ onClick }) => {
  const [showCategory, setShowCategory] = useLocalStorage("category", false);

  const onClickDrawer = useCallback(() => {
    setShowCategory(prev => !prev);
  }, []);

  return (
    <div className="category-container">
      <div>
        <button onClick={onClickDrawer} className="category-open">
          {showCategory ? "-" : "+"}
        </button>
      </div>
      <div className="category-bar-outer">
        <div className="category-bar">
          {showCategory &&
            CATEGORIES.map((category, idx) => (
              <button
                onClick={onClick}
                key={idx}
                id={category.toLowerCase()}
                className="category-bar__item"
              >
                {category}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
