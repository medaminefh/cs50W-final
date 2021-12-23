import { useState, useEffect } from "react";
import Card from "../Card/card";
import LoadingPage from "../utils/loading";
import HandleDate from "../utils/handleDate";
import SmoothList from "react-smooth-list";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const token = localStorage.token;
  const [ErrorFetching, setError] = useState("");
  const ServerURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000"
      : process.env.REACT_APP_SERVER_URL;
  const [Blogs, setBlogs] = useState([]);

  const showBlogs = !Blogs.length
    ? "Nothing"
    : Blogs.map((blog) => {
        return (
          <Card
            key={blog.id}
            id={blog.id}
            handleDate={HandleDate}
            updatedAt={blog.updatedAt}
            short={blog.short}
            title={blog.title}
            long={blog.long}
          />
        );
      });

  useEffect(() => {
    fetch(ServerURL + "/blogs/", { headers: { authorization: token } })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) return;
        console.log(data);
        setBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        return;
      });
  }, []);

  return Blogs ? (
    <>
      <div className="container d-flex w-100 justify-content-between align-items-center">
        {token && (
          <Link to={"/blog/create"} className="btn btn-primary">
            Create
          </Link>
        )}
      </div>
      <SmoothList delay={130} className="posts mb-5">
        {showBlogs}
      </SmoothList>
    </>
  ) : ErrorFetching ? (
    <h2>There is something wrong, Please do Refresh or come later</h2>
  ) : (
    <LoadingPage />
  );
};

export default LandingPage;
