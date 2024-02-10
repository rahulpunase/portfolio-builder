import Input from "@/lib/ui/components/input";
import useIsInPreviewMode from "@/lib/utils/hooks/useIsInPreviewMode";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateEmail, updateName } from "@/store/slice/builder";
import { selectPersonalInfo } from "@/store/slice/builder/selectors";

const PersonalInfo = () => {
  const dispatch = useAppDispatch();
  const personalInfo = useAppSelector(selectPersonalInfo);
  const isInPreviewMode = useIsInPreviewMode();

  return (
    <div className="mt-8">
      <form>
        <div className="flex flex-col">
          <Input
            placeholder="Enter your name here"
            className="text-[16px] mb-1 font-semibold"
            name="name"
            onChange={(ev) => dispatch(updateName(ev.target.value))}
            value={personalInfo.name}
            defaultValue={personalInfo.name}
            readOnly={isInPreviewMode}
            isInPreviewMode={isInPreviewMode}
          />

          <Input
            className="text-[14px]"
            name="email"
            placeholder="Enter email"
            onChange={(ev) => dispatch(updateEmail(ev.target.value))}
            value={personalInfo.email}
            defaultValue={personalInfo.email}
            readOnly={isInPreviewMode}
            isInPreviewMode={isInPreviewMode}
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
