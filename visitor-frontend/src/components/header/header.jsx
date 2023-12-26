import { logOut } from "@/lib/utils";
import { Button } from "../ui/button";

const Header = () => {
  const isAuthenticated = localStorage.getItem("access_token");

  const handleLogout = () => {
    logOut();
  };

  if (!isAuthenticated) return null;
  return (
    <div className="w-full flex justify-end p-5">
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Header;
