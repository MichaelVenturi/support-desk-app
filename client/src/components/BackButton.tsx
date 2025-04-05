import { Link } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const BackButton: React.FC<{ url: string }> = ({ url }) => {
  return (
    <Link to={url} className="btn btn-reverse btn-back">
      <FaArrowAltCircleLeft /> Back
    </Link>
  );
};
export default BackButton;
