import React, { useContext } from "react";

import { CATEGORIES } from "../../constants/index";
import { DarkModeStateContext } from "../../context/DarkModeProvider";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./category.scss";

const Category = ({ onClick }) => {
  const [showCategory, setShowCategory] = useLocalStorage(
    "categoryOpen",
    false
  );
  const isDarkMode = useContext(DarkModeStateContext);

  const handleToggleDrawer = () => {
    setShowCategory(prev => !prev);
  };

  return (
    <div className={`category-container ${isDarkMode ? "dark" : "light"}`}>
      <div>
        <button onClick={handleToggleDrawer} className="category-drawer">
          {showCategory ? "-" : "+"}
        </button>
      </div>
      <div className="category-bar">
        {showCategory &&
          CATEGORIES.map((category, idx) => (
            <button onClick={onClick} key={idx} id={category.toLowerCase()}>
              {category}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Category;
