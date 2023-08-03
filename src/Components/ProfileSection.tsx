import styles from "../styles/ProfileSection.module.scss";

const ProfileSection = () => {
  //Quick lil profile section, just a name and a description, nothing too fancy
  return (
    <div className={styles.profileSection}>
      <p id={styles.profileSection__name}>ss.utl</p>
      <h1 id={styles.profileSection__desc}>
        Campbell Shay, city stroller, vibe controller. Headphones on.
      </h1>
    </div>
  );
};

export default ProfileSection;
