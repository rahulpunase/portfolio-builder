import Input from "@/lib/ui/components/input";

const SkillCard = () => {
  return (
    <div className="flex p-6 rounded-[25px] h-[400px] bg-white border border-border-1 w-[48%]">
      <form>
        <Input placeholder="Untitled" className="mb-2" />
        <Input placeholder="Write description here" className="text-[14px]" />
      </form>
    </div>
  );
};

export default SkillCard;
