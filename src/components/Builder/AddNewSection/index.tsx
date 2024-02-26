import { MetaSectionType, Sections } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/ui/components/dropdownMenu";
import { useAppDispatch } from "@/store";
import { addSection } from "@/store/slice/builder";
import { Globe, Lightbulb, Link, PencilRuler, PinIcon } from "lucide-react";
import { ReactNode } from "react";

const ButtonIcon = () => {
  return (
    <div className="rounded-full h-[20px] aspect-square justify-center items-center flex bg-backgroundHighlight group-hover:bg-white mr-4">
      +
    </div>
  );
};

const AddNewSection = () => {
  const dispatch = useAppDispatch();

  const onClickHandler = (type: string) => {
    dispatch(
      addSection({
        sectionType: type as MetaSectionType,
      })
    );
  };

  const iconMap: Record<
    MetaSectionType,
    {
      icon: ReactNode;
      color: string;
    }
  > = {
    ABOUT: {
      icon: <PinIcon className="h-4 w-4" />,
      color: "#de5353",
    },
    SKILLS: {
      icon: <Lightbulb className="h-4 w-4" />,
      color: "#868621",
    },
    PROJECTS: {
      icon: <PencilRuler className="h-4 w-4" />,
      color: "#c55252",
    },
    EXPERIENCE: {
      icon: <Globe className="h-4 w-4" />,
      color: "#63a4b8",
    },
    CTA: {
      icon: <Link className="h-4 w-4" />,
      color: "#c2aa7c",
    },
  };

  return (
    <div className="w-full mb-32">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="border bg-backgroundHighlight hover:cursor-pointer rounded-lg text-center mt-28 border-border-1 border-dashed p-4 w-full">
            + Click to add sections
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {Sections.map((sectionItem) => (
            <DropdownMenuItem
              key={sectionItem.type}
              onClick={() => onClickHandler(sectionItem.type)}
              className="group"
            >
              <div className="flex flex-row items-center">
                <ButtonIcon />
                <div style={{ color: iconMap[sectionItem.type].color }}>
                  {iconMap[sectionItem.type].icon}
                </div>{" "}
                <div className="ml-2 mr-2">Add</div>
                {sectionItem.name}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AddNewSection;
