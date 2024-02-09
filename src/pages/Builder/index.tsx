import Header from "./_components/Header";
import Builder from "@/components/Builder";

const BuilderPage = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center mt-8">
        <div className="w-[1024px]">
          <Builder />
        </div>
      </div>
    </>
  );
};

export default BuilderPage;
