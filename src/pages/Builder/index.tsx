import Header from "./_components/Header";
import Builder from "@/components/Builder";

const BuilderPage = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center mt-8 px-4 sm:px-0">
        <div className="sm:w-[1024px] w-full">
          <Builder />
        </div>
      </div>
    </>
  );
};

export default BuilderPage;
