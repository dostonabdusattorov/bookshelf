import { Button } from "../Button";
import NotFoundImage from "../../assets/images/undraw_page_not_found_re_e9o6 1.svg";
import styles from "./NotFound.module.scss";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className={styles.notFound}>
      <img src={NotFoundImage} alt="Not Found" />
      <div className={styles.btns}>
        <Button width="240px" onClick={() => navigate("/", { replace: true })}>
          Go Home Page
        </Button>
        <Button variant="outlined" width="240px">
          Reload Page
        </Button>
      </div>
    </section>
  );
};
