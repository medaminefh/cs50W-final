import { Link } from "react-router-dom";

export default function Card({
  id,
  nonPublic,
  updatedAt,
  short,
  title,
  handleDate: HandleDate,
}) {
  const token = localStorage.token;

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

      <Link
        to={{
          pathname: `blogs/${id}`,
        }}
        className="btn"
      >
        Read More
      </Link>
    </div>
  );
}
