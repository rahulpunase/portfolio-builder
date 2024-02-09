import LogoEditor from "../LogoEditor";

const SiteNameEditor = () => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <LogoEditor variant="small" />
      </div>
      <div className="w-[200px]">
        {/* <LexicalEditor placeholderText="Site Title" theme={{}} /> */}
      </div>
    </div>
  );
};

export default SiteNameEditor;
