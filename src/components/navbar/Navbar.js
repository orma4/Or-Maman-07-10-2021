import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const history = useHistory();

  return (
    <nav>
      <button onClick={() => history.push("/")}>home</button>
      <button onClick={() => history.push("/favorites")}>favorites</button>
    </nav>
  );
};

export default Navbar;
