import { useAppSelector } from "@/store";
import AddNewSection from "./_components/AddNewSection";
import Header from "./_components/Header";
import InfoSection from "./_components/Info";
import SiteHeader from "./_components/SiteHeader";
import { selectSectionList } from "@/store/slice/builder/selectors";
import SectionWrapper from "./_components/SectionWrapper";

const BuilderPage = () => {
  const sectionList = useAppSelector(selectSectionList);

  return (
    <>
      <Header />
      <div className="flex justify-center mt-8">
        <div className="w-[1024px]">
          <SiteHeader />
          <div className="mt-20">
            <InfoSection />
          </div>
          <div>
            <SectionWrapper />
            {!sectionList.length && <AddNewSection />}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuilderPage;
