import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faInstagram, faYoutube, faFacebook } from "@fortawesome/free-brands-svg-icons";

const SocialIcons: React.FC = () => {
  return (
    <div style={styles.container}>
      <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} style={styles.icon} />
      </a>
      <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} style={styles.icon} />
      </a>
      <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faYoutube} style={styles.icon} />
      </a>
      <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} style={styles.icon} />
      </a>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "15px",
  },
  icon: {
    fontSize: "24px",
    color: "#333",
    transition: "color 0.3s",
  },
};

export default SocialIcons;