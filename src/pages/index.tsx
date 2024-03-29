import { Navbar } from "@/components";
import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Image from "next/image";
import { useWishlist, WishlistProvider } from "@/components/WishlistContext";
import { useNotification } from "@/components/NotificationProvider";
import { useBooking } from "@/components/BookingContext";
import Footer from "@/components/Footer";

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
  const { wishlist, addToWishlist } = useWishlist();
  const showNotification = useNotification();
  const { bookedCars, bookCar } = useBooking();

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
  const handleLikeButtonClick = (carType: any) => {
    addToWishlist({
      vehicle: carType.vehicle,
      imageURL: carType.imageURL,
      price: carType.price,
      description: carType.description,
    });
    showNotification(`${carType.vehicle} added to wishlist!`);
  };
  const handleBookButtonClick = (car: Car) => {
    bookCar(car);
    addToWishlist(car); // Optionally, you can remove the booked car from the wishlist when booked
    showNotification(`${car.vehicle} booked successfully!`);
  };

  return (
    <>
      <WishlistProvider>
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
                {filterCarTypes().length === 0 ? (
                  <p className="font-poppins mb-[64px] font-bold text-[32px] text-center">
                    No matching vehicles found.
                  </p>
                ) : (
                  <div className="flex flex-col lg:flex-row justify-center gap-[32px] my-[16px] text-white mx-5">
                    {filterCarTypes().map((carType: any) => (
                      <div
                        key={carType.vehicle}
                        className="max-w-[300px] min-h-[400px] bg-primary p-[16px] rounded-[8px] flex flex-col justify-between">
                        <div>
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
                        </div>
                        <div className="flex flex-row justify-center items-center gap-x-[16px]">
                          <button
                            onClick={handleShareButtonClick}
                            className="bg-white text-primary py-1 px-3 rounded-[8px] outline-white hover:text-white hover:outline-white active:text-primary active:outline-primary outline-2 -outline-offset-1 hover:bg-primary duration-300">
                            Share
                          </button>
                          {copiedToClipboard && <p>URL copied to clipboard!</p>}
                          <button
                            onClick={() => handleLikeButtonClick(carType)}
                            className="bg-white text-primary py-1 px-3 rounded-[8px] outline-white hover:text-white hover:outline-white active:text-primary active:outline-primary outline-2 -outline-offset-1 hover:bg-primary duration-300">
                            Like
                          </button>
                          <button
                            onClick={() => handleBookButtonClick(carType)}
                            className="bg-white text-primary py-1 px-3 rounded-[8px] outline-white hover:text-white hover:outline-white active:text-primary active:outline-primary outline-2 -outline-offset-1 hover:bg-primary duration-300">
                            Book
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="font-poppins mb-[64px] font-bold text-[32px] text-center">
                Select a category to view details.
              </p>
            ))}
        </div>
        <Footer />
      </WishlistProvider>
    </>
  );
}
