import LogoEditor from "@/components/Builder/LogoEditor";
import LexEditor from "@/lib/ui/components/LexEditor";
import Input from "@/lib/ui/components/input";

type CTAProps = {
  isInPreviewMode: boolean;
  isSectionInEditMode: boolean;
  onValueChange?: (html: string, field: string) => void;
  title: string;
  subtext: string;
};
const CTAEditor = ({
  isInPreviewMode,
  isSectionInEditMode,
  onValueChange,
  title,
  subtext,
}: CTAProps) => {
  return (
    <div>
      <Input
        isInPreviewMode={isInPreviewMode}
        className="text-[30px]"
        placeholder="Enter title here"
        readOnly={!isSectionInEditMode}
        onChange={(ev) => onValueChange?.(ev.target.value, "title")}
        defaultValue={title}
      />
      <div className="mb-8">
        <LexEditor
          name="cta-subtext"
          theme={{
            paragraph: "text-[14px]",
          }}
          placeholderText="Add subtext here..."
          isSectionInEditMode={isSectionInEditMode}
          onValueChange={(html) => onValueChange?.(html, "subtext")}
          htmlValue={subtext}
        />
      </div>
      <div className="flex flex-row items-center">
        <div className="mr-4">
          <LogoEditor onUpdate={() => null} preview="" variant="small" />
        </div>
        <div className="text-[14px]">Let's connect</div>
      </div>
    </div>
  );
};

export default CTAEditor;
