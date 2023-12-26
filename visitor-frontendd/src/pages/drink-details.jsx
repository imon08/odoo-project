import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import useMutation from "@/lib/hooks/useMutation";
import useQuery from "@/lib/hooks/useQuery";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const DrinkDetails = () => {
  const navigate = useNavigate();
  const [drinkId, setDrinkId] = useState("");

  const isPreviousConfigured = localStorage.getItem("visiting_details");
  const isCurrentConfigured = localStorage.getItem("drink_details");

  const { data: drinks } = useQuery({ route: "drinks" });

  const { isLoading, mutate } = useMutation({
    route: "/drinks/visitor",
  });

  const handleConfirm = async () => {
    if (isLoading) return;

    if (!drinkId) {
      toast.error("Please select a drink.");
    }

    try {
      await mutate({
        drinkId,
      });

      const data = {
        drink: drinks.find((drink) => drink.id === drinkId).name,
      };

      localStorage.setItem("drink_details", JSON.stringify(data));

      setTimeout(() => {
        navigate("/thanks");
      }, 0);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleNoThanks = () => {
    const data = {
      drink: "No",
    };
    localStorage.setItem("drink_details", JSON.stringify(data));
    setTimeout(() => {
      navigate("/thanks");
    }, 0);
  };

  if (!isPreviousConfigured) {
    return <Navigate to="/visiting" />;
  }

  if (isCurrentConfigured) {
    return <Navigate to="/thanks" />;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <section className="border-2 p-5 rounded-lg w-full">
        <div className="space-y-2">
          <Label className="text-xl" htmlFor="reason">
            Do you want any drink?
          </Label>
        </div>

        <section className="flex justify-between items-center gap-5 flex-wrap mt-5 w-full">
          {drinks?.map((drink) => (
            <div
              key={drink.id}
              onClick={() => setDrinkId(drink.id)}
              className={`flex justify-center items-center flex-col cursor-pointer hover:bg-gray-200 transition-colors duration-200 p-2 rounded-lg ${
                drinkId === drink.id ? "border-2 border-blue-500" : ""
              }`}
            >
              {/* name and image */}
              <img
                className="h-24 w-24 object-cover"
                src={drink.image}
                alt={drink.name}
              />
              <p>{drink.name}</p>
            </div>
          ))}
        </section>

        <section className="flex items-center gap-5">
          <Button
            onClick={handleConfirm}
            disabled={isLoading}
            className="mt-10 w-full h-12"
          >
            Confirm
          </Button>

          <Button
            onClick={handleNoThanks}
            className="mt-10 w-full h-12 bg-stone-500"
          >
            No, Thanks
          </Button>
        </section>
      </section>
    </div>
  );
};

export default DrinkDetails;
