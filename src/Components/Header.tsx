import styles from "../styles/Header.module.scss";

interface HeaderProps {
  location: "Portfolio" | "Store";
  setLocation: React.Dispatch<React.SetStateAction<"Portfolio" | "Store">>;
}

const Header: React.FC<HeaderProps> = ({ location, setLocation }) => {
  //Quick lil profile section, just a name and a description, nothing too fancy
  return (
    <div className={styles.Header}>
      <div className={styles.Header__name}></div>
      <div className={styles.Header__navigation}>
        <div
          onClick={() => setLocation("Portfolio")}
          className={`${styles.Header__navigation__buttton} ${
            location === "Portfolio" ? styles.active : ""
          }`}
        >
          <p>PORTFOLIO</p>
        </div>
        <div
          onClick={() => setLocation("Store")}
          className={`${styles.Header__navigation__buttton} ${
            location === "Store" ? styles.active : ""
          }`}
        >
          <p>STORE</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
