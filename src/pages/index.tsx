import { Navbar } from "@/components";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Image from "next/image";

type Idea = {
  id: number;
  name: string;
  imageURL: string;
};

type Props = {
  ideas?: Idea[];
};

export default function Home({ ideas }: any) {
  const [data, setData] = useState(ideas);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          `https://private-f2fbfb-ridecar2.apiary-mock.com/vehicles`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fecthData();
  }, []);
  const displayTypeData = (categoryId: any) => {
    setSelectedCategoryId(categoryId);
  };
  const filterCarTypes = () => {
    if (!data || selectedCategoryId === null) {
      return [];
    }

    const typeData = data.type.find(
      (type: any) => type.category_id === selectedCategoryId
    );

    if (!typeData) {
      return [];
    }

    const filteredCarTypes = typeData.car_type.filter((carType: any) =>
      carType.vehicle.toLowerCase().includes(searchInput.toLowerCase())
    );

    return filteredCarTypes;
  };
  const handleShareButtonClick = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopiedToClipboard(true);
    });
  };

  return (
    <>
      <Navbar />
      <div className="h-[85vh] mt-[15vh] bg-cover bg-center inset-0 clip-triangle bg-primary">
        <div className="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute font-poppins">
          <p className="text-white text-6xl rounded-[8px] text-center">
            Bluebird
          </p>
          <p className="text-white text-xl rounded-[8px] text-center">
            Where all our great things begin
          </p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search by vehicle"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="block mx-auto py-3 px-1 font-poppins border-2 border-primary rounded0-[8px]"
      />
      <div className="lg:flex lg:flex-wrap lg:flex-row gap-5 justify-center p-[64px] grid grid-cols-1 sm:grid-cols-2">
        {data?.category?.map((idea: any) => (
          <div
            key={idea.id}
            onClick={() => displayTypeData(idea.id)}
            className="shadow-md rounded-[8px] h-[300px] w-[200px] font-poppins bg-primary text-white text-center hover:cursor-pointer duration-300 hover:scale-110">
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
      <div className="font-poppins">
        {data &&
          (selectedCategoryId !== null ? (
            <>
              <h1 className="text-[64px] font-poppins font-bold text-center">
                {
                  data.category.find(
                    (category: any) => category.id === selectedCategoryId
                  ).name
                }
              </h1>
              <div className="flex flex-row justify-center gap-x-[32px] my-[16px] text-white">
                {filterCarTypes().map((carType: any) => (
                  <div key={carType.vehicle} className="max-w-[300px] bg-primary p-[16px] rounded-[8px]">
                    <h1 className="font-bold font-poppins">
                      {carType.vehicle}
                    </h1>
                    <Image
                      src={carType.imageURL}
                      alt={carType.vehicle}
                      width={1000}
                      height={1000}
                      className="max-w-full"
                    />
                    <p>Price: {carType.price}</p>
                    <p>Description: {carType.description.join(", ")}</p>
                    <button onClick={handleShareButtonClick}>Share</button>
                    {copiedToClipboard && <p>URL copied to clipboard!</p>}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Select a category to view details.</p>
          ))}
      </div>
    </>
  );
}
