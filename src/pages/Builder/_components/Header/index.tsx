import Button from "@/lib/ui/components/button";

const Header = () => {
  return (
    <header className="w-full bg-[#232323] h-[55px] flex items-center px-4 justify-between">
      <div className="flex flex-row text-white gap-x-4">
        <div>Site builder</div>
        <div>Sections</div>
        <div>Preferences</div>
      </div>
      <div>
        <Button />
      </div>
    </header>
  );
};

export default Header;
