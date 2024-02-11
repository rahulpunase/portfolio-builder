import LogoEditor from "@/components/Builder/LogoEditor";
import LexEditor from "@/lib/ui/components/LexEditor";
import { Projects } from "@/lib/constants";
import Input from "@/lib/ui/components/input";

type ProjectCardProps = {
  id?: string;
  isSectionInEditMode: boolean;
  isInPreviewMode?: boolean;
  onUpdateField?: (value: string, key: string, field: keyof Projects) => void;
  data?: Projects;
};

const ProjectCard = ({
  id,
  data,
  onUpdateField,
  isInPreviewMode,
  isSectionInEditMode,
}: ProjectCardProps) => {
  return (
    <div className="bg-white border border-border-light sm:p-6 p-4 rounded-[25px] flex flex-col sm:basis-[48%] basis-[100%] min-h-[200px] sm:min-h-[300px]">
      <div className="mb-4">
        <LogoEditor
          variant="small"
          onUpdate={(data) => onUpdateField?.(data as string, id ?? "", "logo")}
          preview={data?.logo ?? ""}
        />
      </div>
      <Input
        placeholder="Enter Project Title"
        className="text-[15px] mb-4"
        onChange={(ev) => onUpdateField?.(ev.target.value, id ?? "", "title")}
        isInPreviewMode={!!isInPreviewMode}
        readOnly={!isSectionInEditMode}
        defaultValue={data?.title}
      />
      <LexEditor
        name={id ?? ""}
        theme={{
          paragraph: "text-[14px] font-light",
        }}
        htmlValue={data?.description}
        isSectionInEditMode={isSectionInEditMode}
        onValueChange={(html) => onUpdateField?.(html, id ?? "", "description")}
        placeholderText="Add Description"
      />
    </div>
  );
};

export default ProjectCard;
