import AdminSideBar from "./sidebar"; // Fix import to point to the correct file
import AdminHeader from "./header";   // Fix import to point to the correct file
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Admin Sidebar */}
      <AdminSideBar />
      <div className="flex flex-1 flex-col">
        {/* Admin Header */}
        <AdminHeader />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet /> {/* This renders child routes */}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;