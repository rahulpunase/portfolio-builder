import LexEditor from "@/lib/ui/components/LexEditor";
import Input from "@/lib/ui/components/input";

type SectionTitleProps = {
  isInPreviewMode: boolean;
  isSectionInEditMode: boolean;
  defaultTitle: string;
  subtext: string;
  onUpdateTitles?: (value: string, field: string) => void;
  placeholder?: string;
};

const SectionTitle = ({
  isInPreviewMode,
  isSectionInEditMode,
  onUpdateTitles,
  defaultTitle,
  subtext,
  placeholder,
}: SectionTitleProps) => {
  return (
    <div className="flex flex-col w-full">
      <div className="mb-2">
        <Input
          readOnly={!isSectionInEditMode}
          isInPreviewMode={isInPreviewMode}
          className="text-[30px]"
          placeholder={placeholder}
          onChange={(ev) => onUpdateTitles?.(ev.target.value, "title")}
          defaultValue={defaultTitle}
        />
      </div>
      <div className="mb-8">
        <LexEditor
          name="project-subtext"
          theme={{}}
          htmlValue={subtext}
          isSectionInEditMode={isSectionInEditMode}
          onValueChange={(html) => onUpdateTitles?.(html, "subtext")}
          placeholderText="Add subtext here..."
        />
      </div>
    </div>
  );
};

export default SectionTitle;
