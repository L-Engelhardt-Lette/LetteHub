import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import DarkModeToggle from "../button/switch/DarkmodeSwitch";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState<"dark" | "light">("dark");
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = darkMode === "dark" ? "light" : "dark";
    setDarkMode(newMode);
    if (newMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Base links for the navbar
  const baseLinks = [
    { title: "Home", sublinks: [{ title: "N/A", href: "#" }] },
    { title: "About", sublinks: [{ title: "N/A", href: "#" }] },
    {
      title: "Impressum",
      sublinks: [{ title: "Impressums Page", href: "/Impressum" }],
    },
    {
      title: "Code",
      sublinks: [
        { title: "Github", href: "https://github.com/LudwigLEDE/LetteHub" },
      ],
    },
  ];

  // Add new link if logged in
  if (isAuthenticated) {
    baseLinks.push({
      title: "Dashboard",
      sublinks: [{ title: "User Dashboard", href: "/dashboard" }],
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
        darkMode={darkMode} // Pass darkMode as a prop
        isAuthenticated={isAuthenticated} // Pass isAuthenticated as a prop
        logout={logout} // Pass logout as a prop
        navigate={navigate} // Pass navigate as a prop
        setDarkMode={setDarkMode} // Pass setDarkMode as a prop
      >
        {/* Page content can go here */}
      </RoundedDrawerNav>
    </div>
  );
};

type LinkType = {
  title: string;
  sublinks: { title: string; href: string }[];
};

const RoundedDrawerNav = ({
  children,
  darkMode,
  links,
  isAuthenticated,
  logout,
  navigate,
  setDarkMode,
}: {
  darkMode: "dark" | "light";
  links: LinkType[];
  children?: React.ReactNode;
  isAuthenticated: boolean;
  logout: () => void;
  navigate: (path: string) => void;
  setDarkMode: Dispatch<SetStateAction<"dark" | "light">>;
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
        className={`p-4 ${
          darkMode === "dark" ? "bg-backgrounddark" : "bg-backgroundlight"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Logo />
            <DesktopLinks
              links={links}
              setHovered={setHovered}
              hovered={hovered}
              activeSublinks={activeSublinks}
            />
          </div>

          {/* Right side: Dark Mode Toggle and Login/Logout button */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <DarkModeToggle mode={darkMode} setMode={setDarkMode} />

            {/* Show Login or Logout button */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout(); // Call logout to clear user state
                  navigate("/login"); // Navigate to login page
                }}
                className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="rounded-md bg-indigo-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-indigo-600"
              >
                Login
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileNavOpen((pv) => !pv)}
              className="mt-0.5 block text-2xl text-foregroundlight dark:text-foregrounddark md:hidden"
            >
              <FiMenu />
            </button>
          </div>
        </div>
        <MobileLinks links={links} open={mobileNavOpen} />
      </nav>
      <motion.main layout className={`px-2 pb-2`}>
        <div className="rounded-3xl">{children}</div>
      </motion.main>
    </>
  );
};

const Logo = () => {
  return (
    <svg
      id="Ebene_2"
      data-name="Ebene 2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 94.95 94.95"
    />
  );
};

const DesktopLinks = ({
  links,
  setHovered,
  hovered,
  activeSublinks,
}: {
  links: LinkType[];
  setHovered: Dispatch<SetStateAction<string | null>>;
  hovered: string | null;
  activeSublinks: LinkType["sublinks"];
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
      <AnimatePresence mode="popLayout">
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 py-6"
          >
            {activeSublinks.map((l) => (
              <a
                className="block text-2xl font-semibold text-foregroundlight dark:text-foregrounddark transition-colors hover:text-neutral-400"
                href={l.href}
                key={l.title}
              >
                {l.title}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MobileLinks = ({ links, open }: { links: LinkType[]; open: boolean }) => {
  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-2 gap-6 py-6 md:hidden"
        >
          {links.map((l) => (
            <div key={l.title} className="space-y-1.5">
              <span className="text-md block font-semibold text-neutral-50 dark:text-foregrounddark">
                {l.title}
              </span>
              {l.sublinks.map((sl) => (
                <a
                  className="text-md block text-neutral-300 dark:text-foregrounddark"
                  href={sl.href}
                  key={sl.title}
                >
                  {sl.title}
                </a>
              ))}
            </div>
          ))}
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
    onMouseLeave={() => setHovered(null)}
    className="cursor-pointer text-foregroundlight dark:text-foregrounddark transition-colors hover:text-secondarycontent"
  >
    {children}
  </span>
);

export default Navbar;
