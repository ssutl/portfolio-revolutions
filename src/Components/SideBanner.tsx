import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import styles from "../styles/SideBanner.module.scss";
import { useRouter } from "next/router";

const Sidebanner = () => {
  const router = useRouter();

  return (
    //Side banner showing all socials
    <div className={styles.sideBannerSection}>
      <p id={styles.sideBannerSection__name} onClick={() => router.push("/")}>
        Portfolio - 1.0
      </p>
      <div className={styles.sideBannerSection__socials}>
        <GitHubIcon
          className={styles.socialIcon}
          onClick={() =>
            (window.location.href = "https://github.com/ssutl?tab=repositories")
          }
        />
        <InstagramIcon
          className={styles.socialIcon}
          onClick={() =>
            (window.location.href = "https://www.instagram.com/ss.utl/")
          }
        />
        <LinkedInIcon
          className={styles.socialIcon}
          onClick={() =>
            (window.location.href = "https://www.linkedin.com/in/ss-utl")
          }
        />
      </div>
    </div>
  );
};

export default Sidebanner;
