import React, { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <footer>© 2024 Your Website</footer>
    </div>
  );
};

export default Layout;
