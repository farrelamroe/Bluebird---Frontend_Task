import Image from "next/image";

type Idea = {
  id: number;
  name: string;
  imageURL: string;
};

type Props = {
  ideas?: Idea[];
};

const CardContent: React.FC<Props> = ({ ideas }: any) => {
  return (
    <div className="lg:flex lg:flex-wrap lg:flex-row gap-5 justify-center p-[64px] grid grid-cols-1 sm:grid-cols-2">
      {ideas?.map((idea: any) => (
        <div key={idea.id} className="shadow-md rounded-[8px] h-[300px] w-[200px] font-poppins">
          <Image
            src={idea.imageURL}
            alt="content"
            width={1000}
            height={1000}
            className="w-full object-cover rounded-t-[8px]"
          />
          <h1 className="text-lg font-bold overflow-hidden line-clamp-3 px-[8px]">
            {idea.name}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default CardContent;
