import React from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ title, description, children }) => {
  return (
    <>
      <Helmet>
        {title && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
      </Helmet>
      <main>{children}</main>
    </>
  );
};

export default Layout;