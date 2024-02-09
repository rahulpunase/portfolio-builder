import { cn } from "@/lib/ui/utils";
import defaultImage from "@/assets/images/mynaui_image.png";
import { ChangeEvent, useState } from "react";

type LogoEditor = {
  variant: "small" | "large";
};
const LogoEditor = ({ variant }: LogoEditor) => {
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const generatePreview = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }
    const imageFile = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <label
      className={cn(
        " bg-backgroundHighlight border border-dashed p-1 flex cursor-pointer justify-center items-center border-border-1",
        variant === "small" && "w-[25px] aspect-square rounded-[5px]",
        variant === "large" && "w-[295px] aspect-square rounded-[25px]"
      )}
    >
      <img
        hidden={!preview}
        src={preview?.toString()}
        className="aspect-auto"
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
      <form>
        <input hidden type="file" onChange={generatePreview} />
      </form>
    </label>
  );
};

export default LogoEditor;
