
import { Outlet } from "react-router-dom";

const BusinessLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Business navigation will go here */}
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default BusinessLayout;
