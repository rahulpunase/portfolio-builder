import Input from "@/lib/ui/components/input";
import LogoEditor from "../LogoEditor";
import { useAppSelector } from "@/store";
import {
  selectPersonalInfo,
  selectProfilePicture,
} from "@/store/slice/builder/selectors";
import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";

const SiteNameEditor = () => {
  const personalInfo = useAppSelector(selectPersonalInfo);
  const profilePicture = useAppSelector(selectProfilePicture);
  const isInPreviewMode = useIsInPreviewMode();
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <LogoEditor
          variant="small"
          preview={profilePicture}
          onUpdate={() => {}}
        />
      </div>
      <div className="w-[200px]">
        <Input
          defaultValue={personalInfo.name}
          value={personalInfo.name}
          isInPreviewMode={isInPreviewMode}
        />
      </div>
    </div>
  );
};

export default SiteNameEditor;
