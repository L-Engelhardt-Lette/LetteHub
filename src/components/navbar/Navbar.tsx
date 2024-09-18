import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import DarkModeToggle from "../button/switch/DarkmodeSwitch";
import { useAuth } from "../../context/AuthContext"; // Import useAuth for authentication

export const Navbar = () => {
  // State for dark mode
  const [darkMode, setDarkMode] = useState<"dark" | "light">("light");

  // Use authentication context
  const { isAuthenticated, logout } = useAuth();

  // Navigation hook
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

  {
    /* Links */
  }
  const baseLinks = [
    {
      title: "Home",
      sublinks: [
        {
          title: "Projekt Erklärung",
          href: "#",
        },
        { title: "Team Management", href: "#" },
      ],
    },
    {
      title: "About",
      sublinks: [],
    },
    {
      title: "Impressum",
      sublinks: [
        {
          title: "Impressums Page",
          href: "#",
        },
        {
          title: "Datenschutz",
          href: "#",
        },
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
        {
          title: "Project Select",
          href: "#",
        },
        { title: "Team Management", href: "#" },
      ],
    });
  }

  return (
    <div
      className={`${
        darkMode === "dark" ? "bg-backgrounddark" : "bg-backgroundlight"
      } text-foregroundlight`}
    >
      <RoundedDrawerNav
        links={baseLinks}
        navBackground={
          darkMode === "dark" ? "bg-backgrounddark" : "bg-backgroundlight"
        }
        bodyBackground="bg-forgroundlight"
        darkMode={darkMode}
        isAuthenticated={isAuthenticated}
        logout={logout}
        navigate={navigate}
        setDarkMode={setDarkMode}
      ></RoundedDrawerNav>
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
  darkMode,
  isAuthenticated,
  logout,
  navigate,
  setDarkMode,
}: {
  navBackground: string;
  bodyBackground: string;
  children?: ReactNode;
  links: LinkType[];
  darkMode: "dark" | "light";
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
            />
          </div>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <DarkModeToggle mode={darkMode} setMode={setDarkMode} />

            {/* Show Login or Logout button */}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="rounded-md bg-red-500 px-3 py-1.5 text-sm text-white transition-colors hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="rounded-md bg-primary px-3 py-1.5 text-sm text-white transition-colors hover:bg-primarydark"
              >
                Login
              </button>
            )}
          </div>
          <button
            onClick={() => setMobileNavOpen((pv) => !pv)}
            className="mt-0.5 block text-2xl text-neutral-50 md:hidden"
          >
            <FiMenu />
          </button>
        </div>
        <MobileLinks links={links} open={mobileNavOpen} />
      </nav>
      <motion.main layout className={`${navBackground} px-2 pb-2`}>
        <div className={`${bodyBackground} rounded-3xl`}>{children}</div>
      </motion.main>
    </>
  );
};

const Logo = () => {
  return <img src="../../../public/Logo.svg" alt="" className="w-8" />;
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
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
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
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="grid grid-cols-2 gap-6 py-6 md:hidden"
        >
          {links.map((l) => {
            return (
              <div key={l.title} className="space-y-1.5">
                <span className="text-md block font-semibold text-neutral-50">
                  {l.title}
                </span>
                {l.sublinks.map((sl) => (
                  <a
                    className="text-md block text-neutral-300"
                    href={sl.href}
                    key={sl.title}
                  >
                    {sl.title}
                  </a>
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
    className="cursor-pointer text-neutral-50 transition-colors hover:text-neutral-400"
  >
    {children}
  </span>
);

export default Navbar;
