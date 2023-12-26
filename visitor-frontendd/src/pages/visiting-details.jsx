import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useMutation from "@/lib/hooks/useMutation";
import useQuery from "@/lib/hooks/useQuery";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const VisitingDetails = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    staffMemberId: "",
    reason: "",
    sendNotification: false,
  });
  const isAlreadyConfigured = localStorage.getItem("visiting_details");

  const { data: staffMembers } = useQuery({ route: "staff" });

  const { isLoading, mutate } = useMutation({
    route: "/visiting",
  });

  const handleConfirm = async () => {
    if (isLoading) return;
    if (!form.staffMemberId || !form.reason) {
      toast.error("Please fill all the fields.");
      return;
    }
    try {
      await mutate({
        ...form,
      });

      const data = {
        member_name: staffMembers.find(
          (member) => member.id === form.staffMemberId
        ).name,
      };

      localStorage.setItem("visiting_details", JSON.stringify(data));

      setTimeout(() => {
        navigate("/drink");
      }, 0);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  if (isAlreadyConfigured) {
    return <Navigate to="/drink" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="border-2 p-5 rounded-lg w-full">
        <div className="space-y-2">
          <Label className="text-xl" htmlFor="reason">
            Whom to visit?
          </Label>
          <Select
            value={form.staffMemberId}
            onValueChange={(val) => setForm({ ...form, staffMemberId: val })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a staff member" />
            </SelectTrigger>
            <SelectContent>
              {staffMembers?.map((staffMember) => (
                <SelectItem key={staffMember.id} value={staffMember.id}>
                  <div className="flex items-center gap-2 w-full">
                    <img
                      className="h-10 w-10 object-cover rounded-full p-1"
                      src={staffMember.image}
                      alt={staffMember.name}
                    />
                    <p>{staffMember.name}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 mt-3">
          <Label className="text-xl" htmlFor="reason">
            Reason
          </Label>
          <Textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            id="reason"
            className="resize-none"
          />
        </div>
        <div className="flex items-center space-x-2 mt-5">
          <Checkbox
            checked={!!form.sendNotification}
            onCheckedChange={(val) =>
              setForm({ ...form, sendNotification: val })
            }
            id="sendNotification"
          />
          <Label htmlFor="sendNotification">Send notification to staff</Label>
        </div>
        <Button
          onClick={handleConfirm}
          disabled={isLoading}
          className="mt-10 w-full h-12"
        >
          Confirm
        </Button>
      </section>
    </div>
  );
};

export default VisitingDetails;
