import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Loading from "../utils/loading";
import marked from "marked";
import HandleDate from "../utils/handleDate";
import { showErrMsg } from "../utils/notification";
import { showSuccessMsg } from "../utils/notification";

const Blog = ({ match, location }) => {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  let history = useHistory();

  const SERVER_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/"
      : process.env.REACT_APP_SERVER_URL;
  const { id } = match.params;
  const { pathname } = location;
  const [blog, setBlog] = useState("");
  let { title, short, long, updatedAt } = blog;

  useEffect(() => {
    fetch(`${SERVER_URL}blogs/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          history.push("/");
          return;
        }
        setBlog(data);

        // smooth scroll to top
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }, "3s");
      })
      .catch((err) => {
        console.log(err);
        history.push("/");
      });
  }, []);

  const handleRemove = () => {
    const confirmation = window.confirm(
      "Are You Sure You want To Delete This?"
    );
    if (confirmation) {
      fetch(`${SERVER_URL}blogs/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userId: "1",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // show some Notification in the ui
          console.log(data);
          setErr("");
          setSuccess(data.msg);
          history.push("/");
        })
        .catch((err) => {
          setSuccess("");
          setErr(err);
          console.log(err);
        });
      return;
    }
    return;
  };

  return blog ? (
    <>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <div className="d-flex justify-content-between">
        <Link to="/" className="btn btn-back">
          Go Back
        </Link>

        <div className="w-25 d-flex justify-content-between">
          <button
            onClick={handleRemove}
            style={{
              backgroundColor: "rgba(214, 10, 10, 0.712)",
              color: "#fff",
            }}
            className="btn btn-back"
          >
            Delete
          </button>

          <Link
            to={{
              pathname: `${pathname}/edit`,
              state: {
                title,

                short,
                long,
              },
            }}
            className="btn btn-back"
          >
            Edit
          </Link>
        </div>
      </div>
      <div className="card card-page">
        <HandleDate updated={updatedAt} />
        <div className="post-body">
          <div
            dangerouslySetInnerHTML={{
              __html: marked(blog.long || ""),
            }}
          />
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Blog;
