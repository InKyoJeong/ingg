import React, { useState } from "react"

const categories = ["All", "JS", "ReactNative", "Web", "Git"]

const Category = ({ onClick }) => {
  const [showCategory, setShowCategory] = useState(false)

  const onClickDrawer = () => {
    setShowCategory(prev => !prev)
  }

  return (
    <div>
      <button onClick={onClickDrawer}>+</button>
      {showCategory &&
        categories.map((category, idx) => (
          <button onClick={onClick} key={idx} id={category.toLowerCase()}>
            {category}
          </button>
        ))}
    </div>
  )
}

export default Category
