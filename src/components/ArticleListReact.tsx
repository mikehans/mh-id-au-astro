import React, { useState } from "react";
import CategoryList from "./CategoryList.tsx";
import CardListReact from "./CardListReact.tsx";
import "./ArticleListReact.css";

function ArticleListReact(props) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const {items} = props;

  let filteredItems;
  if(selectedCategory == '' || selectedCategory == 'All'){
    filteredItems = items;
  }
  else {
    filteredItems = items.filter(item => {
      if(item.data && item.data.tags && item.data.tags.includes(selectedCategory)){
        return item;
      }
    });
  }

  return (
    <>
      <CategoryList items={items} selectedCategory = {selectedCategory} setSelectedCategory = {setSelectedCategory} />

      <CardListReact cards={filteredItems} />
    </>
  );
}

export default ArticleListReact;
