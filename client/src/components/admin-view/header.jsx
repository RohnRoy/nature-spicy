import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      <div className="flex-1" />
      <Button variant="ghost" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}

export default AdminHeader;
