import { useAppDispatch, useAppSelector } from "@/store";
import { selectTitles } from "@/store/slice/builder/selectors";
import { updateTitle } from "@/store/slice/builder";
import LexEditor from "@/components/LexEditor";

const Title = () => {
  const { title } = useAppSelector(selectTitles);
  const dispatch = useAppDispatch();

  const onMainTitleUpdate = (html: string) => {
    dispatch(updateTitle(html));
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <LexEditor
          name="title"
          placeholderText="Click to add title"
          theme={{
            paragraph: "text-[70px]",
          }}
          htmlValue={title}
          onUpdate={onMainTitleUpdate}
        />
      </div>
      <div className="mt-4">
        <LexEditor
          name="subtitle"
          placeholderText="Click to add subtitle"
          theme={{
            paragraph: "text-[18px]",
          }}
          htmlValue=""
        />
      </div>
    </div>
  );
};

export default Title;
