import React from "react";
import './TagList.css';

function TagList(props) {
  const {tags} = props;

  return (
    <>
      {tags && tags.map((tag) => <span class="cardList-tag px0-5">{tag}</span>)}
    </>
  );
}

export default TagList;
