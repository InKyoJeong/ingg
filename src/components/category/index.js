import React, { useState } from "react"
import "./styles.scss"

const categories = ["All", "Javascript", "ReactNative", "Web", "Git"]

const Category = ({ onClick }) => {
  const [showCategory, setShowCategory] = useState(false)

  const onClickDrawer = () => {
    setShowCategory(prev => !prev)
  }

  return (
    <div className="category-container">
      <div>
        <button onClick={onClickDrawer} className="category-open">
          +
        </button>
      </div>
      <div className="category-bar-outer">
        <div className="category-bar">
          {showCategory &&
            categories.map((category, idx) => (
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
  )
}

export default Category
