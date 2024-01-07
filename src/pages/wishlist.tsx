// pages/wishlist.tsx
import { Navbar } from "@/components";
import { useWishlist } from "@/components/WishlistContext";
import Image from "next/image";

const WishlistPage = () => {
  const { wishlist } = useWishlist();

  return (
    <div>
      <Navbar />
      <h1 className="text-center font-bold font-poppins text-[64px] mt-[15vh]">
        Wishlist
      </h1>
      {wishlist.length > 0 ? (
        <div className="flex flex-row justify-center gap-[32px] my-[16px] text-white flex-wrap">
          {wishlist.map((car) => (
            <div
              key={car.vehicle}
              className="max-w-[300px] bg-primary p-[16px] rounded-[8px] flex flex-col text-white">
              <h1 className="font-bold font-poppins">{car.vehicle}</h1>
              <Image
                src={car.imageURL}
                alt={car.vehicle}
                width={1000}
                height={1000}
                className="max-w-full"
              />
              <p>Price: {car.price}</p>
              <p>Description: {car.description.join(", ")}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center font-bold font-poppins">
          Your wishlist is empty.
        </p>
      )}
    </div>
  );
};

export default WishlistPage;
