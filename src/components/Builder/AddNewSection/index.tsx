import { MetaSectionType, Sections } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/ui/components/dropdownMenu";
import { useAppDispatch } from "@/store";
import { addSection } from "@/store/slice/builder";

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
              <ButtonIcon /> Add {sectionItem.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AddNewSection;
