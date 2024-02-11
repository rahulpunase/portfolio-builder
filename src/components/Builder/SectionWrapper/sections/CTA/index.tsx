import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";
import CTAWrapper from "./CTAWrapper";
import { useAppSelector } from "@/store";
import CTAEditor from "./CTAEditor";
import { selectCTASection } from "@/store/slice/builder/selectors";

const CTA = () => {
  const isInPreviewMode = useIsInPreviewMode();
  const CTASelection = useAppSelector(selectCTASection);
  return isInPreviewMode ? (
    <CTAEditor
      isInPreviewMode={isInPreviewMode}
      isSectionInEditMode={false}
      title={CTASelection?.title ?? ""}
      subtext={CTASelection?.subtext ?? ""}
    />
  ) : (
    <CTAWrapper type="CTA" />
  );
};

export default CTA;
