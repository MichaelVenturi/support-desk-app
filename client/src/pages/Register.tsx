import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { register, reset } from "../redux/features/auth/authSlice";
import Spinner from "../components/Spinner";
import { IRootState } from "../types/stateTypes";

interface IFormData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const Register = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useAppDispatch();
  const { user, isError, isLoading, isSuccess, message } = useSelector((state: IRootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Register;
