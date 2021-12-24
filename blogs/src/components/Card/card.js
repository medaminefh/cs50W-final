import { Link } from "react-router-dom";

export default function Card({
  id,
  updatedAt,
  short,
  title,
  handleDate: HandleDate,
}) {
  return (
    <div className={"card"}>
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
