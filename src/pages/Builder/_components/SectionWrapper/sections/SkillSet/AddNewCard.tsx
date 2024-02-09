const AddNewCard = () => {
  return (
    <button className="flex p-6 rounded-[25px] h-[400px] bg-backgroundHighlight cursor-pointer border border-border-1 w-[48%] justify-center items-center">
      <div className="flex flex-col items-center">
        <div>+</div>
        <div>Add new card</div>
      </div>
    </button>
  );
};

export default AddNewCard;
