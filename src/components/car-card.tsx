// import Car from "../../public/images/accord.png";
// import Flag from "../../public/icons/flag-kr.svg";

interface CarProps {
  name: string;
  make: string;
  year: string;
  flag_img: string;
  car_img: string;
}

interface FlagInterface {
  id: string;
  path: string;
}

// Flag list
const Flag: FlagInterface[] = [
  {
    id: "jp",
    path: "flag-jp.svg",
  },
  {
    id: "de",
    path: "flag-de.svg",
  },
  {
    id: "kr",
    path: "flag-kr.svg",
  },
];

// function to find the flag path based on the flag ID
const getFlagPath = (flagId: string): string => {
  const flag = Flag.find((f) => f.id === flagId);
  return flag ? `/icons/${flag.path}` : "";
};

export default function CarCard({
  name,
  make,
  flag_img,
  car_img,
  year,
}: CarProps) {
  const flagPath = getFlagPath(flag_img);

  return (
    <>
      <div className="h-[32rem] bg-[#939393] rounded-lg py-10 opacity-90 ">
        <div className="w-[90%] mx-auto px-8 flex flex-col gap-4 text-white">
          <div className="flex justify-between">
            <h3 className="font-semibold text-xl ">{name}</h3>
            <img
              src={flagPath}
              alt="Flag"
              className="rounded-xl max-w-[48px]"
            />
          </div>

          <figure className="flex rounded-xl my-4 px-10 py-4 h-[200px] shadow-md bg-white ">
            <img src={`/images/${car_img}`} alt={name} className="my-auto" />
          </figure>

          <div className="text-center text-xl">
            <p className="text-black">Make</p>
            <p>{make}</p>
          </div>
          <div className="text-center text-xl">
            <p className="text-black">Release Year</p>
            <p>{year}</p>
          </div>
        </div>
      </div>
    </>
  );
}
