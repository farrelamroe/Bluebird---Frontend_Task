import Image from "next/image";

export function Footer() {
  const data = [
    {
      imageUrl: "/facebook.png",
    },
    {
      imageUrl: "/instagram.png",
    },
    {
      imageUrl: "/twitter.png",
    },
    {
      imageUrl: "/youtube.png",
    },
    {
      imageUrl: "/linkedin.png",
    },
    {
      imageUrl: "/tiktok.png",
    },
  ];
  return (
    <>
      <div className="bg-primary w-full px-5">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <Image
            src="/logo-footer.svg"
            alt="logo"
            width={10000}
            height={10000}
            className="max-w-[300px]"
          />
          <div className="flex flex-col leading-[24px] gap-y-[8px] mt-[16px]">
            <p className="font-bold font-poppins text-white">
              Bluebird Main Office
            </p>
            <p className="font-regular font-poppins text-white">
              Jl. Mampang Prapatan Raya No. 60, Jakarta 12790
            </p>
          </div>
          <div className="flex flex-col gap-y-[8px] mt-[16px]">
            <p className="font-bold font-poppins text-white">Connect with us</p>
            <div className="flex flex-row gap-x-[8px]">
              {data.map(({ imageUrl }) => {
                return (
                  <Image
                    src={imageUrl}
                    alt="logo"
                    width={25}
                    height={25}
                    className=""
                    key=""
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
