import Button from "@/lib/ui/components/button";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="w-full bg-header text-[14px] sm:h-[55px] flex items-center px-2 sm:px-4 sm:justify-between">
    <div className="flex flex-row text-white gap-x-4">
      <div className="mr-8">Site builder</div>
      <div>Sections</div>
      <div>Preferences</div>
    </div>
    <div>
      <Link to="/preview" className="text-white underline">
        Preview
      </Link>
      <Button />
    </div>
  </header>
);

export default Header;
