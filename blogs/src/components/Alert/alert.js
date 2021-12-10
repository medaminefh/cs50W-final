const Alert = ({ handleClick }) => (
  <div className="alert alert-warning alert-dismissible fade show" role="alert">
    Not completed Yet, Stay Tuned 😀 COMING VERY SOON⏳ <br />
    Here is some Anime Quotes you might Like 👇
    <button onClick={handleClick} type="button" className="btn-close"></button>
  </div>
);

export default Alert;
