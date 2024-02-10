import { cn } from "@/lib/ui/utils";
import defaultImage from "@/assets/images/mynaui_image.png";
import { ChangeEvent } from "react";
import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";

type LogoEditor = {
  variant: "small" | "large";
  onUpdate: (dataUrl: string | ArrayBuffer | null) => void;
  preview: string;
};
const LogoEditor = ({ variant, onUpdate, preview }: LogoEditor) => {
  const isInPreviewMode = useIsInPreviewMode();

  const generatePreview = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }
    const imageFile = ev.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      onUpdate(reader.result);
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <label
      className={cn(
        " bg-backgroundHighlight border relative overflow-hidden border-dashed p-1 flex cursor-pointer justify-center items-center border-border-1",
        variant === "small" && "w-[25px] aspect-square rounded-[5px]",
        variant === "large" && "w-[295px] aspect-square rounded-[25px]",
        preview && "border-none"
      )}
    >
      <img
        hidden={!preview}
        src={preview?.toString()}
        className="aspect-auto absolute top-0 left-0 w-full h-full object-cover"
      />
      <img
        hidden={!!preview}
        className={cn(
          "",
          variant === "small" && "w-full h-full",
          variant === "large" && "h-[54px] aspect-square"
        )}
        src={defaultImage}
        alt="Default"
      />
      {!isInPreviewMode && (
        <form>
          <input hidden type="file" onChange={generatePreview} />
        </form>
      )}
    </label>
  );
};

export default LogoEditor;
