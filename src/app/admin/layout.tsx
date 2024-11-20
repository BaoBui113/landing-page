import React from "react";
import ClientQuery from "@/components/ClientQuery";
import { Toaster } from 'react-hot-toast';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientQuery>
      {children}
      <Toaster />
    </ClientQuery>
  );
};

export default AdminLayout;
