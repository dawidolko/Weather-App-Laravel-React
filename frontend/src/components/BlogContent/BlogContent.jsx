import "./BlogContent.scss";
import blogData from "./BlogData";
import BlogItem from "./BlogItem";

const BlogContent = () => {
  return (
    <section className="blog">
      <h2 className="blog__heading">
        Stay Updated with the Latest Weather News & Insights
      </h2>
      <div className="blog__body container">
        {blogData.map((item) => (
          <BlogItem {...item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default BlogContent;
