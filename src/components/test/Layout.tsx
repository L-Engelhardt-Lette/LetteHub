import React, { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-backgroundlight dark:bg-backgroundlight">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
