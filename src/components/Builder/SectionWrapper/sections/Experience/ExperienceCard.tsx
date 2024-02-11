import LogoEditor from "@/components/Builder/LogoEditor";
import LexEditor from "@/lib/ui/components/LexEditor";
import { Experience } from "@/lib/constants";
import Input from "@/lib/ui/components/input";

type ExperienceCardProps = {
  id: string;
  data: Experience;
  onUpdateField?: (value: string, key: string, field: keyof Experience) => void;
  isInPreviewMode: boolean;
  isSectionInEditMode: boolean;
};

const ExperienceCard = ({
  data,
  onUpdateField,
  id,
  isInPreviewMode,
  isSectionInEditMode,
}: ExperienceCardProps) => {
  return (
    <div className="bg-white border border-border-light p-6 rounded-[25px] w-full flex flex-col gap-y-4">
      <div className="flex flex-row">
        <div className="w-[30px] h-[50px] flex justify-start items-center">
          <LogoEditor
            variant="small"
            onUpdate={(preview) =>
              onUpdateField?.(preview as string, id, "logo")
            }
            preview={data.logo}
          />
        </div>
        <div className="p-2 flex flex-col">
          <Input
            placeholder="Enter company title"
            className="mb-2"
            onChange={(ev) =>
              onUpdateField?.(ev.target.value, id, "companyTitle")
            }
            isInPreviewMode={isInPreviewMode}
            readOnly={!isSectionInEditMode}
            defaultValue={data.companyTitle}
          />
          <Input
            placeholder="Enter designation"
            className="text-[14px]"
            onChange={(ev) =>
              onUpdateField?.(ev.target.value, id, "designation")
            }
            isInPreviewMode={isInPreviewMode}
            readOnly={!isSectionInEditMode}
            defaultValue={data.designation}
          />
        </div>
      </div>
      <div className="flex flex-row">
        <Input
          placeholder="+ Add location"
          className="text-[14px] font-light"
          onChange={(ev) => onUpdateField?.(ev.target.value, id, "location")}
          isInPreviewMode={isInPreviewMode}
          readOnly={!isSectionInEditMode}
          defaultValue={data.location}
        />
        <Input
          placeholder="+ Add timeline"
          className="text-[14px] font-light"
          onChange={(ev) => onUpdateField?.(ev.target.value, id, "timeline")}
          isInPreviewMode={isInPreviewMode}
          readOnly={!isSectionInEditMode}
          defaultValue={data.timeline}
        />
      </div>
      <div>
        <LexEditor
          placeholderText="Add description"
          theme={{
            paragraph: "text-[14px] font-light",
          }}
          onValueChange={(html) => onUpdateField?.(html, id, "description")}
          name="experience-description"
          htmlValue={data.description}
          isSectionInEditMode={isSectionInEditMode}
        />
      </div>
    </div>
  );
};

export default ExperienceCard;
