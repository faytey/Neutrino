import DisplayNFT from "../../components/sell/DisplayNFT";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { neutrinoEstate } from "../../utils/contractInfo";

const Property = () => {
  const { id } = useRouter().query;
  const ID = Number(id);

  const [allProperties, setAllProperties] = useState();
  const [nftId, setNftId] = useState();

  const { data, isLoading, isError } = useContractRead({
    address: "0x1f6feeed3fb9696a5fb3a6ab78b5b3c7e1eb2f5f",
    abi: neutrinoEstate.abi,
    functionName: "getAllProperties",
  });

  useEffect(() => {
    setAllProperties(data);
    setNftId(data?.[ID]?.[3]);
  }, [allProperties, data, nftId]);

  console.log(allProperties);
  console.log(String(nftId));
  return (
    <div className="flex flex-col items-center w-[90%] md:w-[50%] mx-auto p-8 shadow-lg m-8">
      <h1>Property Details</h1>
      <div className="m-4 border-2 border-black flex flex-col items-center gap-2 font-sans">
        <DisplayNFT id={nftId} width={350} height={250} />
        <p className="text-center">Owner: {allProperties?.[ID]?.[0]}</p>
        <p className="text-center">
          Contract Address: {allProperties?.[ID]?.[1]}
        </p>
        <p>
          Property Status:{" "}
          {allProperties?.[ID]?.[2] == 0 ? <>For Sale</> : <>For Rent</>}
        </p>
        <p>I.D.: {String(allProperties?.[ID]?.[3])}</p>
        <p>Price: {String(allProperties?.[ID]?.[6] / 10 ** 18)} ETH</p>
        <p>Supply: {String(allProperties?.[ID]?.[7])}</p>
        <p>
          Buyer:{" "}
          {allProperties?.[ID]?.[9] ==
          "0x0000000000000000000000000000000000000000" ? (
            <>0x0</>
          ) : (
            allProperties?.[ID]?.[9]
          )}
        </p>
        <p>Amount Paid: {String(allProperties?.[ID]?.[10])} ETH</p>
        <p>Rented: {allProperties?.[ID]?.[12] == true ? <>YES</> : <>NO</>}</p>
        <p>Sold: {allProperties?.[ID]?.[11] == true ? <>YES</> : <>NO</>}</p>
      </div>
    </div>
  );
};

export default Property;
