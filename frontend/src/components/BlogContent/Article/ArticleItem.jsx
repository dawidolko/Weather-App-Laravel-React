import PropTypes from "prop-types";

const ArticleItem = ({
  img = "/default-article.jpg",
  alt = "Article Image",
  title = "Default Title",
  text = "This is a default article text.",
  highlight = "",
  text2 = "",
}) => {
  return (
    <div className="article__container">
      <img className="article__img" src={img} alt={alt} />
      <div className="article__content">
        <h2 className="article__title">{title}</h2>
        <p className="article__text">{text}</p>
        {highlight && <p className="article__text-highlight">{highlight}</p>}
        {text2 && <p className="article__text">{text2}</p>}
      </div>
    </div>
  );
};

ArticleItem.propTypes = {
  img: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  highlight: PropTypes.string,
  text2: PropTypes.string,
};

export default ArticleItem;
