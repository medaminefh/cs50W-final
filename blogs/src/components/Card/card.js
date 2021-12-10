import { Link } from "react-router-dom";
import HandleBadges from "../utils/handlebadges";

export default function Card({
  id,
  img_url,
  categories,
  nonPublic,
  updatedAt,
  short,
  title,
  setFilter,
  handleDate: HandleDate,
}) {
  const token = localStorage.token;

  const badges = categories.map((category) => {
    return (
      <div
        onClick={() => setFilter(category)}
        style={{ cursor: "pointer" }}
        key={Math.random() * 60000}
      >
        <HandleBadges category={category} />
      </div>
    );
  });

  return (
    <div
      className={
        token && nonPublic
          ? "card private "
          : token && !nonPublic
          ? "card public"
          : "card"
      }
    >
      <HandleDate updated={updatedAt} />

      <h3>{title}</h3>

      <p>{short}</p>

      {img_url && <img src={img_url} alt={title} />}

      <div className="d-flex flex-wrap justify-content-around mt-2 mb-2">
        {badges}
      </div>

      <Link
        to={{
          pathname: `/blog/${id}`,
        }}
        className="btn"
      >
        Read More
      </Link>
    </div>
  );
}
