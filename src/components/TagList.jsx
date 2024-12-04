import React from "react";
import './TagList.css';

function TagList(props) {
  const {tags} = props;

  return (
    <>
      {tags && tags.map((tag) => <span className="cardList-tag px0-5" key={tag}>{tag}</span>)}
    </>
  );
}

export default TagList;
