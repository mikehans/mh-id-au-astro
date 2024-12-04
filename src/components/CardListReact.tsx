import React from "react";
import Card from "@components/Card";

function CardListReact({ cards }) {
  return (
    <>
      <ul className="articleList">
        {cards.map((card) => (
          <Card
            title={card.data.title}
            pubDate={card.data.date}
            imageUrl={card.data.imageUrl || "/img/article.jpg"}
            description={card.data.description}
            readMoreLink={`/articles/${card.slug}`}
            tags={card.data.tags}
            key={card.slug}
          />
        ))}
      </ul>
    </>
  );
}

export default CardListReact;
