import { Link } from "react-router-dom";

const LoginSignupNavbar = ({ text, path, title }) => {
  return (
    <header className="border-b-2 w-full py-4">
      <div className="w-10/12 m-auto">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <h2 className="font-bold text-2xl text-dark">SyncStock</h2>
          </div>
          <div className="text-right">
            <p className="text-black font-medium text-sm">
              {text}{" "}
              <span className="text-primary">
                <Link to={path}>{title}</Link>
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoginSignupNavbar;
