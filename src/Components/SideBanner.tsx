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
        <ArrowCircleDownIcon
          className={styles.socialIcon}
          id="arrowUpDown"
          onClick={() => {
            if (window.scrollY * 0.3 < 180) {
              document.querySelector(".projectsSection")?.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
              });
            } else {
              document.querySelector(".profileSection")?.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
              });
            }
          }}
        />

        <GitHubIcon
          className={styles.socialIcon}
          onClick={() =>
            (window.location.href =
              "https://github.com/shayCamp?tab=repositories")
          }
        />
        <InstagramIcon
          className={styles.socialIcon}
          onClick={() =>
            (window.location.href = "https://www.instagram.com/shaycampbll/")
          }
        />
        <TwitterIcon className={styles.socialIcon} />
        <LinkedInIcon
          className={styles.socialIcon}
          onClick={() =>
            (window.location.href =
              "https://www.linkedin.com/in/shay-campbell-395b17215/")
          }
        />
      </div>
    </div>
  );
};

export default Sidebanner;
