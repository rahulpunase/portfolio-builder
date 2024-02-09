import TitleEditor from "./TitleEditor";

const Title = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <TitleEditor
          name="title"
          placeholderText="Click to add title"
          theme={{
            paragraph: "text-[70px]",
          }}
        />
      </div>
      <div className="mt-4">
        <TitleEditor
          name="subtitle"
          placeholderText="Click to add subtitle"
          theme={{
            paragraph: "text-[18px]",
          }}
        />
      </div>
    </div>
  );
};

export default Title;
