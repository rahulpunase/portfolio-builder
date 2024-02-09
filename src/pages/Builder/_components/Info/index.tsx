import LogoEditor from "../LogoEditor";
import PersonalInfoEditor from "./PersonalInfo";
import TitleEditor from "./Title";

const InfoSection = () => {
  return (
    <div className="w-full flex flex-row">
      <div>
        <LogoEditor variant="large" />
        <PersonalInfoEditor />
      </div>
      <div className="flex flex-grow ml-[80px] justify-center items-center">
        <TitleEditor />
      </div>
    </div>
  );
};

export default InfoSection;
