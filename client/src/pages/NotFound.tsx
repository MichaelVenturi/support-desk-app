import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>Oops! That page doesn't exist</h1>
      <Link to="/" className="btn btn-block">
        Return to home page
      </Link>
    </>
  );
};
export default NotFound;
