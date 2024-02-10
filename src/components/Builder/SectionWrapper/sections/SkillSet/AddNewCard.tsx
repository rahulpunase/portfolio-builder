import { useAppDispatch } from "@/store";
import { addCardToSkillSection } from "@/store/slice/builder";

const AddNewCard = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(addCardToSkillSection())}
      className="flex p-6 rounded-[25px] min-h-[300px] bg-backgroundHighlight cursor-pointer border border-border-1 w-[48%] justify-center items-center"
    >
      <div className="flex flex-col items-center">
        <div>+</div>
        <div>Add new card</div>
      </div>
    </button>
  );
};

export default AddNewCard;
