import Input from "@/lib/ui/components/input";
import LogoEditor from "@/pages/Builder/_components/LogoEditor";

const ProjectCard = () => {
  return (
    <div className="bg-white p-6 rounded-[25px] flex flex-col w-[48%]">
      <div className="mb-2">
        <LogoEditor variant="small" />
      </div>
      <Input placeholder="Enter Project Title" className="text-[15px] mb-2" />
      <Input placeholder="Add description" className="text-[13px]" />
    </div>
  );
};

export default ProjectCard;
