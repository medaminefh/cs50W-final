const HandleDate = ({ updated: UpdatedAt, counter = null }) => {
  const updatedAtDateObj = new Date(UpdatedAt);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const updatedAt = updatedAtDateObj.toLocaleDateString("en-US", options);

  if (!counter)
    return (
      <div className="post-date">
        <i className="far fa-clock me-2"></i>
        {updatedAt}
      </div>
    );

  return (
    <div className="post-date">
      <span>{updatedAt}</span>
      <span className="ms-5">
        <i className="far fa-eye me-1"></i> {counter}
      </span>
    </div>
  );
};

export default HandleDate;
