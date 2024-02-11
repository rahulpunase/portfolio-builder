import LexEditor from "@/lib/ui/components/LexEditor";
import { Skills } from "@/lib/constants";
import Input from "@/lib/ui/components/input";
type SkillCards = {
  id?: string;
  isSectionInEditMode: boolean;
  isInPreviewMode?: boolean;
  onValueChange?: (value: string, key: string, field: keyof Skills) => void;
  data?: Skills;
};
const SkillCard = ({
  id,
  data,
  onValueChange,
  isInPreviewMode,
  isSectionInEditMode,
}: SkillCards) => {
  return (
    <div className="flex p-6 rounded-[25px] overflow-auto max-h-[400px] bg-white border border-border-light min-h-[200px] sm:min-h-[300px] basis-[100%] sm:basis-[48%]">
      <form>
        <Input
          placeholder="Untitled"
          className="mb-2 font-semibold w-full"
          onChange={(ev) => onValueChange?.(ev.target.value, id ?? "", "title")}
          defaultValue={data?.title}
          isInPreviewMode={!!isInPreviewMode}
          readOnly={!isSectionInEditMode}
        />
        <Input
          placeholder="Write description here"
          className="text-[14px] mb-4 w-full"
          onChange={(ev) =>
            onValueChange?.(ev.target.value, id ?? "", "description")
          }
          defaultValue={data?.description}
          isInPreviewMode={!!isInPreviewMode}
          readOnly={!isSectionInEditMode}
        />
        <LexEditor
          name={id ?? ""}
          theme={{
            paragraph: "text-[14px] font-light",
          }}
          htmlValue={data?.content}
          placeholderText="Start writing here..."
          onValueChange={(value) => onValueChange?.(value, id ?? "", "content")}
          isSectionInEditMode={isSectionInEditMode}
        />
      </form>
    </div>
  );
};

export default SkillCard;
