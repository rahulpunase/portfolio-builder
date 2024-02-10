import { useAppDispatch, useAppSelector } from "@/store";
import LogoEditor from "../LogoEditor";
import PersonalInfoEditor from "./PersonalInfo";
import Title from "./Title";
import { updateProfilePicture } from "@/store/slice/builder";
import { selectProfilePicture } from "@/store/slice/builder/selectors";

const InfoSection = () => {
  const dispatch = useAppDispatch();
  const profilePicturePreview = useAppSelector(selectProfilePicture);
  return (
    <div className="w-full flex flex-row">
      <div>
        <LogoEditor
          preview={profilePicturePreview}
          variant="large"
          onUpdate={(str) => dispatch(updateProfilePicture(str as string))}
        />
        <PersonalInfoEditor />
      </div>
      <div className="flex flex-grow ml-[80px] justify-center items-center">
        <Title />
      </div>
    </div>
  );
};

export default InfoSection;
