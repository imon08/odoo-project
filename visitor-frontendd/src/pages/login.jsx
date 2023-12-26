import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useMutation from "@/lib/hooks/useMutation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const isAuthenticated = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
  });

  const { isLoading, mutate } = useMutation({
    route: "/visitor",
  });

  const handleSubmit = async () => {
    if (isLoading) return;
    if (!form.name || !form.mobile || !form.address) {
      toast.error("Please fill all the fields.");
      return;
    }
    try {
      const { name, mobile, address } = form;
      const data = await mutate({
        name,
        mobile,
        address,
      });
      if (!data.token) {
        toast.error("Something went wrong. Please try again later.");
        return;
      }
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("visitor_details", JSON.stringify(data.user));
      toast.success("Successfully logged in.");
      setTimeout(() => {
        navigate("/visiting");
      }, 0);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/visiting" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="border-2 p-5 rounded-lg w-full">
        <div className="space-y-2">
          <Label className="text-xl" htmlFor="name">
            Name
          </Label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            id="name"
          />
        </div>
        <div className="space-y-2 mt-3">
          <Label className="text-xl" htmlFor="mobile">
            Mobile
          </Label>
          <Input
            id="mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
        </div>
        <div className="space-y-2 mt-3">
          <Label className="text-xl" htmlFor="address">
            Address
          </Label>
          <Textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            id="address"
            className="resize-none"
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="mt-10 w-full h-12"
        >
          Submit
        </Button>
      </section>
    </div>
  );
};

export default Login;
