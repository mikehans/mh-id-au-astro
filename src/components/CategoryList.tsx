import React, {useState} from "react";
import "./CategoryList.css";

function CategoryList(props) {
  const [filter, setFilter] = useState('all');

  const { items } = props;
  const uniqueTags = new Set();

  items.forEach(
    (item) => item.data.tags && item.data.tags.forEach((t) => uniqueTags.add(t))
  );
  console.log(uniqueTags);

  const tags = [...uniqueTags.values()].sort();

  const handleFilterClick = (e: any) => {
    console.log(e)
    // e.preventDefault();
    setFilter('asdf');
    alert('clicked');
  }

  return (
    <>
      {/* <h3>Categories</h3> */}
      {/* <p>Click to filter posts by a category.</p> */}
      <p>Selected Filter: {filter}</p>
      <ul className="categoryList">
        {tags.map((it) => (
          <li className="category">
            <button className="filter-button" onClick={() => handleFilterClick({it})}>
              {it}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CategoryList;
