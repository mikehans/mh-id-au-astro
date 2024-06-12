import React from "react";
import FormattedDate from "./FormattedDate";
import TagList from "./TagList";
import './Card.css';

function Card(props) {
    const {title, pubDate, imageUrl, description, readMoreLink, tags} = props;
  return (
    <>
      <li className="cardList-card has-darkBackground">
        <h3 className="cardList-cardHeading mx0-5">{title}</h3>
        <p className="cardList-cardDate mx0-5 my0-5">
          Published: <FormattedDate date={pubDate} />
        </p>
        <div className="cardList-cardImageContainer">
          <img src={imageUrl} className="cardList-cardImage" />
        </div>
        <p className="cardList-cardDescription mx0-5">{description}</p>
        <p className="cardList-tagList">
          <TagList tags={tags} />
        </p>
        <a className="cardList-cardLink mx0-5 my0-5" href={readMoreLink}>
          Read more
        </a>
      </li>
    </>
  );
}

export default Card;
