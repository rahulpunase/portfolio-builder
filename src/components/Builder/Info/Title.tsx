import { useAppDispatch, useAppSelector } from "@/store";
import { selectTitles } from "@/store/slice/builder/selectors";
import { updateSubtitle, updateTitle } from "@/store/slice/builder";
import LexEditor from "@/components/LexEditor";

const Title = () => {
  const { title, subtitle } = useAppSelector(selectTitles);
  const dispatch = useAppDispatch();

  const onMainTitleUpdate = (html: string) => dispatch(updateTitle(html));
  const onSubtitleUpdate = (html: string) => dispatch(updateSubtitle(html));

  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <LexEditor
          name="title"
          placeholderText="Click to add title"
          theme={{
            paragraph: "text-[70px] leading-tight",
          }}
          htmlValue={title}
          onValueChange={onMainTitleUpdate}
        />
      </div>
      <div className="mt-4">
        <LexEditor
          name="subtitle"
          placeholderText="Click to add subtitle"
          theme={{
            paragraph: "text-[18px]",
          }}
          htmlValue={subtitle}
          onValueChange={onSubtitleUpdate}
        />
      </div>
    </div>
  );
};

export default Title;
