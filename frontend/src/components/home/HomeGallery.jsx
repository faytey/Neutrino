import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { neuNFT, neutrinoEstate } from "../../utils/contractInfo";
import DisplayNFT from "../sell/DisplayNFT";

const HomeGallery = () => {
  const [allProperties, setAllProperties] = useState();

  const { data, isLoading, isError } = useContractRead({
    address: neutrinoEstate.address,
    abi: neutrinoEstate.abi,
    functionName: "getAllProperties",
  });

  useEffect(() => {
    setAllProperties(data);
  }, [allProperties]);
  // console.log(allProperties);

  return (
    <div className="flex flex-col gap-8 px-8 w-full my-[2rem]">
      <div className="flex flex-col items-center justify-center">
        <span>
          <Image
            src="/footerassets/rec.png"
            alt="line"
            width={100}
            height={3}
          />
        </span>
        <br />
        <h1 className="font-bold text-3xl text-center">
          Explore our neighbourhoods
        </h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {allProperties?.map((item, i) => {
          return (
            <Link href={`/description/${i}`} key={i}>
              <div className="relative h-[15rem] w-[100%] hover:cursor-pointer hover:scale-125 mb-6">
                <div className="absolute inset-0">
                  <DisplayNFT id={item?.[3]} width={350} height={250} />
                </div>

                <div className="relative z-10 flex flex-col items-start mt-[12rem] gap-4">
                  <span className="p-[1rem] bg-white w-[50%] rounded-lg">
                    <h1 className="text-xl font-bold">
                      <span>Price: </span>
                      {String(item?.[6]) / 10 ** 18} ETH
                    </h1>
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomeGallery;
