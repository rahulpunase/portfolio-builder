import { useAppDispatch } from "@/store";
import { addCardToProjectsSection } from "@/store/slice/builder";

const AddNewCard = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(addCardToProjectsSection())}
      className="flex p-6 rounded-[25px] min-h-[200px] sm:min-h-[300px] sm:basis-[48%] basis-[100%] bg-backgroundHighlight cursor-pointer border border-border-light w-[48%] justify-center items-center"
    >
      <div className="flex flex-col items-center">
        <div>+</div>
        <div>Add new card</div>
      </div>
    </button>
  );
};

export default AddNewCard;
