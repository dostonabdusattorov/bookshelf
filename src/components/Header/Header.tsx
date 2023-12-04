import logo from "../../assets/images/logo (1).svg";
import searchIcon from "../../assets/images/search-refraction.svg";
import styles from "./Header.module.scss";
import bell from "../../assets/images/Frame 1.svg";
import avatar from "../../assets/images/17192581_1140324592744139_3381332769681077534_o 2.svg";
import { FC } from "react";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

interface Props {
  search: string;
  onSearch: (text: string) => void;
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    width: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    textAlign: "center",
    paddingTop: "20px",
  },
}));

export const Header: FC<Props> = ({ search, onSearch }) => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.logoSearch}>
        <div className={styles.logo}>
          <img src={logo} alt="Bookshelf app logo" />
        </div>
        <div className={styles.search}>
          <input
            type="search"
            placeholder="search books..."
            value={search}
            onChange={(event) => onSearch(event.target.value)}
          />
          <img src={searchIcon} alt="search icon" />
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.img}>
          <img src={bell} alt="notification" />
        </div>
        <HtmlTooltip
          title={
            <Button
              onClick={() => {
                navigate("/sign-in", { replace: true });
                localStorage.removeItem("name");
              }}
              width="100%"
            >
              Log Out
            </Button>
          }
        >
          <div className={styles.img}>
            <img src={avatar} alt="avatar" />
          </div>
        </HtmlTooltip>
      </div>
    </header>
  );
};
