import { useAppSelector } from "@/store";
import AddNewSection from "./AddNewSection";
import InfoSection from "./Info";
import SectionWrapper from "./SectionWrapper";
import SiteHeader from "./SiteHeader";
import { selectSectionList } from "@/store/slice/builder/selectors";
import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";

const Builder = () => {
  const sectionList = useAppSelector(selectSectionList);
  const isInPreviewMode = useIsInPreviewMode();

  return (
    <div>
      <SiteHeader />
      <div className="sm:mt-20 mt-8 mb-8 sm:mb-0">
        <InfoSection />
      </div>
      <div>
        <SectionWrapper />
        {!sectionList.length && !isInPreviewMode && <AddNewSection />}
      </div>
    </div>
  );
};

export default Builder;
