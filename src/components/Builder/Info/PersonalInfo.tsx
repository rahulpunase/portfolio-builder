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
            placeholder="Enter your name"
            className="text-[16px] mb-1 font-semibold"
            name="name"
            onBlur={(ev) => dispatch(updateName(ev.target.value))}
            defaultValue={personalInfo.name}
            readOnly={isInPreviewMode}
          />

          <Input
            className="text-[14px]"
            name="email"
            onBlur={(ev) => dispatch(updateEmail(ev.target.value))}
            defaultValue={personalInfo.email}
            readOnly={isInPreviewMode}
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
