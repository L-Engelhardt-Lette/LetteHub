import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <footer>© 2024 Your Website</footer>
    </div>
  );
};

export default Layout;
