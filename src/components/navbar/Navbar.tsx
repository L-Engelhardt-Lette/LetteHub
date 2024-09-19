import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Integrated animations
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../button/switch/DarkmodeSwitch";
import { useAuth } from "../../context/AuthContext";
import { useDarkMode } from "../../context/DarkModeContext"; // Import the dark mode context

export const Navbar = () => {
  // Use authentication context
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { mode: darkMode } = useDarkMode();

  // Links
  const baseLinks = [
    {
      title: "Home",
      sublinks: [
        { title: "Home", href: "#" },
        { title: "Projekt Erklärung", href: "#" },
        { title: "Team Management", href: "#" },
      ],
    },
    { title: "About", sublinks: [{ title: "About", href: "#" }] },
    {
      title: "Impressum",
      sublinks: [
        { title: "Impressums Page", href: "#" },
        { title: "Datenschutz", href: "#" },
      ],
    },
    {
      title: "Code",
      sublinks: [
        { title: "Github", href: "https://github.com/LudwigLEDE/LetteHub" },
        { title: "API Docs", href: "http://localhost:8080" },
      ],
    },
  ];

  if (isAuthenticated) {
    baseLinks.push({
      title: "Dashboard",
      sublinks: [
        { title: "Project Select", href: "/project-select" },
        { title: "Team Management", href: "#" },
      ],
    });
  }

  return (
    <div
      className={`${
        darkMode === "dark"
          ? "bg-backgrounddark text-foregrounddark"
          : "bg-backgroundlight text-foregroundlight"
      }`}
    >
      <RoundedDrawerNav
        links={baseLinks}
        navBackground={
          darkMode === "dark" ? "bg-backgrounddark" : "bg-backgroundlight"
        }
        bodyBackground="bg-foregroundlight dark:bg-foregrounddark"
        isAuthenticated={isAuthenticated}
        logout={logout}
        navigate={navigate}
        darkMode={"dark"}
      />
    </div>
  );
};

type LinkType = {
  title: string;
  sublinks: { title: string; href: string }[];
};

const RoundedDrawerNav = ({
  children,
  navBackground,
  bodyBackground,
  links,
  isAuthenticated,
  logout,
  navigate,
}: {
  navBackground: string;
  bodyBackground: string;
  children?: React.ReactNode;
  links: LinkType[];
  darkMode: "dark" | "light";
  isAuthenticated: boolean;
  logout: () => void;
  navigate: (path: string) => void;
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeSublinks = useMemo(() => {
    if (!hovered) return [];
    const link = links.find((l) => l.title === hovered);
    return link ? link.sublinks : [];
  }, [hovered]);

  return (
    <>
      <nav
        onMouseLeave={() => setHovered(null)}
        className={`p-4 ${navBackground}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start">
            <Logo />
            <DesktopLinks
              links={links}
              setHovered={setHovered}
              hovered={hovered}
              activeSublinks={activeSublinks}
              navigate={navigate}
              setMobileNavOpen={setMobileNavOpen} // Pass setMobileNavOpen here
            />
          </div>
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                  setMobileNavOpen(false); // Close the mobile menu
                }}
                className="rounded-md bg-delete px-3 py-1.5 text-sm text-foregrounddark transition-colors hover:bg-primarydark"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileNavOpen(false); // Close the mobile menu
                }}
                className="rounded-md bg-primary px-3 py-1.5 text-sm text-primarycontent transition-colors hover:bg-primarydark"
              >
                Login
              </button>
            )}
          </div>
          <button
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="mt-0.5 block text-2xl text-copy dark:text-foregrounddark md:hidden"
          >
            <FiMenu />
          </button>
        </div>
        <MobileLinks
          links={links}
          open={mobileNavOpen}
          navigate={navigate}
          setMobileNavOpen={setMobileNavOpen}
        />{" "}
        {/* Pass setMobileNavOpen here */}
      </nav>
      <motion.main layout className={`${navBackground} px-2 pb-2`}>
        <div className={`${bodyBackground} rounded-3xl`}>{children}</div>
      </motion.main>
    </>
  );
};

const Logo = () => {
  return <img src="../../../public/Logo.svg" alt="Logo" className="w-8" />;
};

const DesktopLinks = ({
  links,
  setHovered,
  hovered,
  activeSublinks,
  navigate,
  setMobileNavOpen,
}: {
  links: LinkType[];
  setHovered: Dispatch<SetStateAction<string | null>>;
  hovered: string | null;
  activeSublinks: LinkType["sublinks"];
  navigate: (path: string) => void;
  setMobileNavOpen: Dispatch<SetStateAction<boolean>>; // Add this prop to close the nav
}) => {
  return (
    <div className="ml-9 mt-0.5 hidden md:block">
      <div className="flex gap-6">
        {links.map((l) => (
          <TopLink key={l.title} setHovered={setHovered} title={l.title}>
            {l.title}
          </TopLink>
        ))}
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 py-6"
          >
            {activeSublinks.map((l) => (
              <span
                className="block text-2xl font-semibold text-copy dark:text-foregrounddark transition-colors hover:text-copylight dark:hover:text-primarycontent cursor-pointer"
                key={l.title}
                onClick={() => {
                  navigate(l.href); // Use navigate
                  setMobileNavOpen(false); // Close the mobile menu
                }}
              >
                {l.title}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileLinks = ({
  links,
  open,
  navigate,
  setMobileNavOpen,
}: {
  links: LinkType[];
  open: boolean;
  navigate: (path: string) => void;
  setMobileNavOpen: Dispatch<SetStateAction<boolean>>; // Add this prop to close the nav
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 gap-6 py-6 md:hidden"
        >
          {links.map((l) => {
            return (
              <div key={l.title} className="space-y-1.5">
                <span className="text-md block font-semibold text-copy dark:text-foregrounddark">
                  {l.title}
                </span>
                {l.sublinks.map((sl) => (
                  <span
                    className="text-md block text-copylight dark:text-primarycontent transition-colors hover:text-copylighter dark:hover:text-primarylight cursor-pointer"
                    key={sl.title}
                    onClick={() => {
                      navigate(sl.href);
                      setMobileNavOpen(false);
                    }}
                  >
                    {sl.title}
                  </span>
                ))}
              </div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const TopLink = ({
  children,
  setHovered,
  title,
}: {
  children: string;
  setHovered: Dispatch<SetStateAction<null | string>>;
  title: string;
}) => (
  <span
    onMouseEnter={() => setHovered(title)}
    className="cursor-pointer text-copy dark:text-foregrounddark transition-colors hover:text-copylight dark:hover:text-primarycontent"
  >
    {children}
  </span>
);

export default Navbar;
