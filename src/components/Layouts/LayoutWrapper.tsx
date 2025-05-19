import React from "react";
import { Outlet } from "react-router-dom";
import { LoadingProvider } from "../../context/loading";
import { Toaster } from "react-hot-toast";

interface LayoutWrapperProps {
  layout: React.ComponentType<{ children: React.ReactNode }>;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ layout: Layout }) => {
  return (
    // <div>
    <LoadingProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <Layout>
        <Outlet />
      </Layout>
    {/* </div> */}
    </LoadingProvider>
  );
};

export default LayoutWrapper;