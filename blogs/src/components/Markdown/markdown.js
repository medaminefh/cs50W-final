import { useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Link, useParams, useHistory } from "react-router-dom";
import Loading from "../utils/loading";
import { showErrMsg } from "../utils/notification";
import { showSuccessMsg } from "../utils/notification";
import HandleBadges from "../utils/handlebadges";

const Markdown = ({ location }) => {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [checked, setChecked] = useState(true);
  const [tag, setTag] = useState([]);

  const handleChecked = () => {
    setChecked((prev) => !prev);
  };

  let history = useHistory();
  const token = localStorage.token;
  const SERVER_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/"
      : process.env.REACT_APP_SERVER_URL;
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [short, setShort] = useState("");
  const { state } = location;
  const [blog, setBlog] = useState(state);
  const { id } = useParams();
  const [markdown, setMarkdown] = useState("## Type Something cool😎");

  useEffect(() => {
    if (!state && id) {
      fetch(`${SERVER_URL}/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data);
          setImg(data.img_url);
          setTitle(data.title);
          setShort(data.short);
          setMarkdown(data.long);
          setChecked(data.private === true);
        });
    } else if (state && id) {
      setBlog(state);
      setImg(state.img_url);
      setTitle(state.title);
      setShort(state.short);
      setMarkdown(state.long);
      setChecked(state.nonPublic);
    }
  }, []);
  const markdownChange = (newValue) => {
    setMarkdown(newValue);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const imgChange = (e) => {
    setImg(e.target.value);
  };

  const shortChange = (e) => {
    setShort(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");
    if (!title || !short || !markdown) {
      setErr("Fill All the fields");
    }
    // if there is an Id then this is the edit form
    if (id) {
      fetch(`${SERVER_URL}/blogs/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json", authorization: token },
        body: JSON.stringify({
          title,
          short,
          long: markdown,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // show some Notification in the ui
          if (data.err) {
            setSuccess("");
            setErr(data.err);
            return;
          }
          setErr("");
          setSuccess(data.msg);
          history.push(`/blog/${id}`);
        })
        .catch((err) => {
          setSuccess("");
          setErr(err);
          console.log(err);
        });
      return;
    }

    fetch(`${SERVER_URL}/blogs`, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: token },
      body: JSON.stringify({
        title,
        short,
        long: markdown,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // show some Notification in the ui

        if (data.err) {
          setSuccess("");
          setErr(data.err);
          return;
        }
        setErr("");
        setSuccess(data.msg);
        history.push("/");
      })
      .catch((err) => {
        setSuccess("");
        setErr(err);
      });
  };

  if (id) {
    return blog ? (
      <>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <Link
          to={{
            pathname: `/blog/${id}`,
            state: {
              title,
              short,
              long: markdown,
              createdOrUpdated: blog.createdOrUpdated ?? "",
              createdAt: blog.createdAt,
              updatedAt: blog.updatedAt,
            },
          }}
          className="btn btn-back"
        >
          Go Back
        </Link>
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              value={title}
              onChange={titleChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              value={short}
              onChange={shortChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Img Url</label>
            <input
              value={img}
              onChange={imgChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-check form-switch">
            <label className="form-check-label">Private</label>
            <input
              checked={checked}
              onChange={handleChecked}
              className="form-check-input"
              type="checkbox"
            />
          </div>
          <SimpleMDE value={markdown} onChange={markdownChange} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    ) : (
      <Loading />
    );
  } else {
    return (
      <>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        <Link to="/" className="btn btn-back">
          Go Back
        </Link>
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              value={title}
              onChange={titleChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              value={short}
              onChange={shortChange}
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Img Url</label>
            <input
              value={img}
              onChange={imgChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-check form-switch">
            <label className="form-check-label">Private</label>
            <input
              checked={checked}
              onChange={handleChecked}
              className="form-check-input"
              type="checkbox"
            />
          </div>
          <SimpleMDE value={markdown} onChange={markdownChange} />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
  }
};

export default Markdown;
