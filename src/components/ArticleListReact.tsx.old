import React from "react";
import CategoryList from "./CategoryList.tsx";
import Card from "./Card.tsx";
import "./ArticleListReact.css";

function ArticleListReact(props) {
  const {items} = props;

  return (
    <>
      <CategoryList items={items} />

      <ul className="articleList">
        {items.map((card) => (
          <Card
            title={card.data.title}
            pubDate={card.data.date}
            imageUrl={card.data.imageUrl || "/img/article.jpg"}
            description={card.data.description}
            readMoreLink={`/articles/${card.slug}`}
            tags={card.data.tags}
          />
        ))}
      </ul>
    </>
  );
}

export default ArticleListReact;
