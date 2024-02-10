import LexEditor from "@/components/LexEditor";
import { Skills } from "@/lib/constants";
import Input from "@/lib/ui/components/input";
type SkillCards = {
  id?: string;
  isSectionInEditMode: boolean;
  isInPreviewMode?: boolean;
  onTitleChange?: (value: string, key: string) => void;
  onDescriptionChange?: (value: string, key: string) => void;
  onContentChange?: (value: string, key: string) => void;
  data?: Skills;
};
const SkillCard = ({
  id,
  isSectionInEditMode,
  onTitleChange,
  onDescriptionChange,
  onContentChange,
  data,
  isInPreviewMode,
}: SkillCards) => {
  return (
    <div className="flex p-6 rounded-[25px] min-h-[300px] overflow-auto max-h-[400px] bg-white border border-border-1 w-[48%]">
      <form>
        <Input
          readOnly={!isSectionInEditMode}
          placeholder="Untitled"
          className="mb-2 font-semibold w-full"
          onChange={(ev) => onTitleChange?.(ev.target.value, id ?? "")}
          defaultValue={data?.title}
          isInPreviewMode={!!isInPreviewMode}
        />
        <Input
          readOnly={!isSectionInEditMode}
          placeholder="Write description here"
          className="text-[14px] mb-4 w-full"
          onChange={(ev) => onDescriptionChange?.(ev.target.value, id ?? "")}
          defaultValue={data?.description}
          isInPreviewMode={!!isInPreviewMode}
        />
        <LexEditor
          name={id ?? ""}
          theme={{
            paragraph: "text-[14px] font-light",
          }}
          htmlValue={data?.content}
          placeholderText="Start writing here..."
          onValueChange={(value) => onContentChange?.(value, id ?? "")}
        />
      </form>
    </div>
  );
};

export default SkillCard;
