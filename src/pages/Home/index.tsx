import { Link } from "router6-react";
import s from "./styles.css";

const HomePage = () => (
  <div className={s.root}>
    I am a home page,{" "}
    <Link to="segment" params={{ slug: "a" }}>
      go for it
    </Link>
  </div>
);

export default HomePage;
