import { useAppSelector } from "@/store";
import AddNewSection from "./AddNewSection";
import InfoSection from "./Info";
import SectionWrapper from "./SectionWrapper";
import SiteHeader from "./SiteHeader";
import { selectSectionList } from "@/store/slice/builder/selectors";

const Builder = () => {
  const sectionList = useAppSelector(selectSectionList);

  return (
    <>
      <SiteHeader />
      <div className="mt-20">
        <InfoSection />
      </div>
      <div>
        <SectionWrapper />
        {!sectionList.length && <AddNewSection />}
      </div>
    </>
  );
};

export default Builder;
