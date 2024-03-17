import Adddata from "@/components/adddata";
import GetData from "@/components/getdata";

export default async function Home() {
  return (
    <div className="p-4 md:p-10 lg:p-20 items-center ">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-center pb-4 md:pb-6">
        Todo App
      </h1>
      <div className="px-2 md:px-4 lg:px-[250px]">
        <Adddata />
        <GetData />
      </div>
    </div>
  );
}
