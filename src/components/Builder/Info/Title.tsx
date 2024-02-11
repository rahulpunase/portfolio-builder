import { useAppDispatch, useAppSelector } from "@/store";
import { selectTitles } from "@/store/slice/builder/selectors";
import { updateSubtitle, updateTitle } from "@/store/slice/builder";
import LexEditor from "@/lib/ui/components/LexEditor";
import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";

const Title = () => {
  const { title, subtitle } = useAppSelector(selectTitles);
  const dispatch = useAppDispatch();

  const onMainTitleUpdate = (html: string) => dispatch(updateTitle(html));
  const onSubtitleUpdate = (html: string) => dispatch(updateSubtitle(html));
  const isInPreviewMode = useIsInPreviewMode();

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
          isSectionInEditMode={!isInPreviewMode}
        />
      </div>
      <div className="sm:mt-4 mt-10">
        <LexEditor
          name="subtitle"
          placeholderText="Click to add subtitle"
          theme={{
            paragraph: "text-[18px]",
          }}
          htmlValue={subtitle}
          onValueChange={onSubtitleUpdate}
          isSectionInEditMode={!isInPreviewMode}
        />
      </div>
    </div>
  );
};

export default Title;
