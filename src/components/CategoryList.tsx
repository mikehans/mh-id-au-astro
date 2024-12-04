import React, {useState} from "react";
import "./CategoryList.css";

function CategoryList({ items, selectedCategory, setSelectedCategory }) {
  const uniqueTags = new Set();

  items.forEach(
    (item) => item.data.tags && item.data.tags.forEach((t) => uniqueTags.add(t))
  );

  const tags = [...uniqueTags.values()].sort();

  const handleFilterClick = (e) => {
    console.log('e', e)
    e.target.classList.add('selected');
    setSelectedCategory(e.target.innerText);
  }

  return (
    <>
      <p>Selected category: {selectedCategory} </p>

      <ul className="categoryList">
        <li className="category">
        <button className={`filter-button ${selectedCategory == 'All' && 'selected'}`} onClick={handleFilterClick}>
              All
            </button>
        </li>
        {tags.map((tag) => (
          <li className="category" key={tag}>
            <button className={`filter-button ${selectedCategory == tag && 'selected'}`} onClick={handleFilterClick}>
              {tag}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CategoryList;
