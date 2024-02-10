import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";
import AboutYouWrapper from "./AboutYouWrapper";
import { useAppSelector } from "@/store";
import { selectAboutYouSetSection } from "@/store/slice/builder/selectors";

const AboutYou = () => {
  const isInPreviewMode = useIsInPreviewMode();
  const aboutYouSection = useAppSelector(selectAboutYouSetSection);
  return isInPreviewMode ? (
    <div
      dangerouslySetInnerHTML={{ __html: aboutYouSection?.content || "" }}
    ></div>
  ) : (
    <AboutYouWrapper type="ABOUT" />
  );
};

export default AboutYou;
