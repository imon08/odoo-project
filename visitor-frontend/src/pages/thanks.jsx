import { logOut } from "@/lib/utils";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ThanksPage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      logOut();
    }, 1000 * 60 * 5);

    return () => clearTimeout(timer);
  }, []);

  const isPreviousConfigured = localStorage.getItem("drink_details");

  if (!isPreviousConfigured) {
    return <Navigate to="/drink" />;
  }

  const visitor = JSON.parse(localStorage.getItem("visitor_details") || "{}");
  const drink = JSON.parse(localStorage.getItem("drink_details") || "{}");
  const visiting = JSON.parse(localStorage.getItem("visiting_details") || "{}");

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-xl font-semibold">
        Thanks for visiting us {visitor?.name || ""}!
      </h2>
      <p className="mt-5 text-lg text-center text-blue-600">
        Our representative {visiting?.member_name || ""} will contact you
        soon.
        {!drink?.drink || drink?.drink === "No"
          ? ""
          : ` Meanwhile, Enjoy your ${drink?.drink}`}
      </p>
    </div>
  );
};

export default ThanksPage;
