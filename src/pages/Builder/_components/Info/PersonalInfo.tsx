import Input from "@/lib/ui/components/input";

const PersonalInfo = () => {
  return (
    <div className="mt-8">
      <form>
        <div className="flex flex-col">
          <Input
            placeholder="Enter your name"
            className="text-[16px] mb-1 font-semibold"
          />
          <Input placeholder="Enter email" className="text-[14px]" />
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
