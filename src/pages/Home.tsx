import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleLoginClick}>Log In</button>
      <button
        onClick={() => {
          navigate("/collections");
        }}
      >
        Collections
      </button>
    </div>
  );
};

export default Home;
