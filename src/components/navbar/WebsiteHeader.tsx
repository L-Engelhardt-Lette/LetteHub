import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
  memo,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "../User/UserAvatar";
import { motion } from "framer-motion";

const tabs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Project", path: "/projectSelect" },
  { name: "Impressum", path: "/impressum" },
];

const WebsiteHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selected, setSelected] = useState(tabs[0].name);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/api/check-login");
        const data = await response.json();
        setIsLoggedIn(data.loggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <header className="bg-backgroundlight dark:bg-backgrounddark text-foregroundlight dark:text-foregrounddark">
      <div className="p-4 flex flex-wrap justify-between items-center">
        <h1 className="text-primary dark:text-primary-light font-bold text-2xl">
          <Link to="/" id="HeaderTitle">
            LetteHub
          </Link>
        </h1>
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mt-2 md:mt-0">
          {tabs.map((tab) => (
            <MemoizedChip
              key={tab.name}
              text={tab.name}
              selected={selected === tab.name}
              setSelected={setSelected}
              path={tab.path}
            />
          ))}
        </div>
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          <button onClick={handleLoginClick} className="user-icon-button">
            <UserAvatar loggedIn={isLoggedIn} />
          </button>
          <div className="Content">{/* <DarkLightModeSwitch /> */}</div>
        </div>
      </div>
    </header>
  );
};

const Chip = ({
  text,
  selected,
  setSelected,
  path,
}: {
  text: string;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
  path: string;
}) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    setSelected(text);
    navigate(path);
  }, [navigate, setSelected, text, path]);

  return (
    <button
      onClick={handleClick}
      className={`${
        selected
          ? "text-foregroundlight dark:text-primary-light"
          : "text-foregroundlight dark:text-foregrounddark hover:text-primary-light"
      } text-base transition-colors px-3 py-1 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-primary to-primarylight dark:from-primarydark dark:to-primarylight rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

const MemoizedChip = memo(Chip);

export default WebsiteHeader;
