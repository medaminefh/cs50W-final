import { useState, useEffect } from "react";
import Card from "../Card/card";
import LoadingPage from "../utils/loading";
import HandleDate from "../utils/handleDate";
import SmoothList from "react-smooth-list";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const token = localStorage.token;
  const [ErrorFetching, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const ServerURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api"
      : process.env.REACT_APP_SERVER_URL;
  const [Blogs, setBlogs] = useState([]);
  const [pages, setPages] = useState(1);
  const [filteredBlogs, setfilteredBlogs] = useState([]);

  const HandleFilter = () => {
    setfilteredBlogs(Blogs.filter((blog) => blog.categories.includes(filter)));
  };

  useEffect(() => {
    if (filter) HandleFilter();
  }, [filter]);

  const showBlogs = !Blogs.length
    ? "Nothing"
    : !filter
    ? Blogs.map((blog) => {
        return (
          <Card
            setFilter={setFilter}
            key={blog._id}
            img_url={blog.img_url}
            nonPublic={blog.private === "true"}
            categories={blog.categories}
            id={blog._id}
            handleDate={HandleDate}
            updatedAt={blog.updatedAt}
            short={blog.short}
            title={blog.title}
            long={blog.long}
          />
        );
      })
    : filteredBlogs.map((blog) => {
        return (
          <Card
            setFilter={setFilter}
            key={blog._id}
            img_url={blog.img_url}
            nonPublic={blog.private === "true"}
            categories={blog.categories}
            id={blog._id}
            handleDate={HandleDate}
            updatedAt={blog.updatedAt}
            short={blog.short}
            title={blog.title}
            long={blog.long}
          />
        );
      });

  const loadMore = () => {
    setPages(pages + 1);
    setLoading(true);
    setTimeout(() => {
      // you're at the bottom of the page
      fetch(ServerURL + `/blogs/?pages=${pages}`, {
        headers: { authorization: token },
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.err) {
            setPages(false);
            return;
          }
          setBlogs((prev) => [...prev, ...data.blogs]);
          if (data.blogs.length < 10) {
            setPages(false);
            return;
          }
          setPages(Math.ceil(data.pages));
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          return;
        });
    }, 1000);
  };

  useEffect(() => {
    fetch(ServerURL + "/blogs", { headers: { authorization: token } })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) return;
        setBlogs(data.blogs);
        setPages(Math.ceil(data.pages));
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        return;
      });
  }, []);

  return Blogs.length ? (
    <>
      <div className="container d-flex w-100 justify-content-between align-items-center">
        {token && (
          <Link to={"/blog/create"} className="btn btn-primary">
            Create
          </Link>
        )}
        {filter && (
          <button
            type="button"
            className="btn-close"
            title="Clear filter"
            onClick={() => {
              setFilter("");
              setfilteredBlogs([]);
            }}
          ></button>
        )}
      </div>
      <SmoothList delay={130} className="posts mb-5">
        {showBlogs}
      </SmoothList>

      {pages && (
        <button onClick={loadMore} className="btn btn-primary">
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  ) : ErrorFetching ? (
    <h2>There is something wrong, Please do Refresh or come later</h2>
  ) : (
    <LoadingPage />
  );
};

export default LandingPage;
