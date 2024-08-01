import Navbar from "./components/navbar";
import Dropdown from "./components/dropdown";
import CarCard from "./components/car-card";

// library
import axios from "./lib/axios";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Car {
  _id: string;
  name: string;
  make: string;
  release: string;
  origin: string;
  image: string;
}

// years options
const years: string[] = [
  "2020",
  "2010",
  "2000",
  "1990",
  "1980",
  "1970",
  "1960",
  "1950",
];

export default function Home() {
  // Data
  const [cars, setCars] = useState<Car[]>();
  const [make, setMake] = useState<string[]>([]);
  const [origin, setOrigin] = useState<string[]>([]);

  const [searchParams] = useSearchParams();
  //   Setter
  const [filterSearch, setFilterSearch] = useState<string>("");
  const [filterMakes, setFilterMakes] = useState<string>("");
  const [filterYearsFrom, setFilterYearsFrom] = useState<string>("");
  const [filterOrigins, setFilterOrigins] = useState<string>("");

  useEffect(() => {
    // fetch cars
    const fetchCars = async () => {
      const { data } = await axios.get("/cars", {
        params: {
          search: filterSearch,
          make: filterMakes,
          origin: filterOrigins,
          releaseFrom: filterYearsFrom !== "1950" ? filterYearsFrom : "",

          // ReleaseTo  is base on filteryearsfrom selected and add 9 if none default is empty string
          releaseTo: (() => {
            if (filterYearsFrom === "") {
              return "";
            }
            if (filterYearsFrom === "1950") {
              return "1950";
            }
            return (Number(filterYearsFrom) + 9).toString();
          })(),
        },
      });

      setCars(data?.cars);
    };

    // Fetch options for filtering
    const fetchOptions = async () => {
      const { data: makes } = await axios.get("/cars/makes");
      const { data: origins } = await axios.get("/cars/origins");

      setMake(makes?.makes);
      setOrigin(origins?.origins);
    };

    try {
      fetchCars();
      fetchOptions();
    } catch (error) {
      console.error(error);
    }
  }, [filterMakes, filterOrigins, filterSearch, filterYearsFrom, searchParams]);
  return (
    <>
      <main className="">
        <div className="bg-[#262626] py-8">
          <Navbar />
        </div>

        <div className="text-center mt-36 ">
          <h2 className="px-8 pb-6 mx-auto text-3xl font-bold text-center border-b-4 lg:text-5xl border-yellow-400/45 lg:w-max w-96">
            What can we do for you? {Number(filterYearsFrom) + 10}
          </h2>
        </div>

        {/* Filter */}
        <section className="relative z-10 w-full shadow-lg">
          <div className="container px-4 pb-32 mx-auto mt-12 ">
            {/* search input */}
            <div className="flex justify-center w-full py-4 mx-auto mb-12 rounded-lg shadow-md">
              <input
                type="text"
                placeholder="I'm looking for a..."
                className="text-3xl w-[75%] leadings-7 text-center text-opacity-100 bg-transparent border-b-2 outline-none border-[#A6A6A6]  placeholder:text-[#A6A6A6] text-[#A6A6A6]  py-2"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
              />
            </div>

            {/* dropdown */}
            <div className="flex flex-col gap-8 xl:flex-row">
              <Dropdown
                options={make}
                placeholder="All Makes"
                setSelect={setFilterMakes}
                isyear={false}
              />
              <Dropdown
                options={years}
                placeholder="All Years"
                setSelect={setFilterYearsFrom}
                isyear={true}
              />
              <Dropdown
                options={origin}
                placeholder="All Origins"
                setSelect={setFilterOrigins}
                isyear={false}
              />
            </div>
          </div>
        </section>

        <section className="bg-[#262626] min-h-80  pb-24">
          <div className="container px-4 mx-auto">
            {/* Car count */}
            <div className="relative flex justify-center w-full ">
              <div className="absolute w-full max-w-2xl px-12 py-8 text-3xl font-bold text-center -translate-y-2 bg-white rounded-lg h-max">
                <h1>{cars?.length} cars found:</h1>
              </div>
            </div>

            {/* CAR CARDS Wrapper*/}
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 md:grid-cols-2 pt-44 ">
              {/* card */}
              {/* {cars?.map((car) => (
                <CarCard
                  key={car._id}
                  name={car.name}
                  make={car.make}
                  flag_img={car.origin}
                  car_img={car.image}
                  year={car.release}
                />
              ))} */}
              {cars?.length ? (
                cars.map((car) => (
                  <CarCard
                    key={car._id}
                    name={car.name}
                    make={car.make}
                    flag_img={car.origin}
                    car_img={car.image}
                    year={car.release}
                  />
                ))
              ) : (
                <div className="font-bold text-center text-white text-2 xl col-span-full">
                  <h3>No cars.</h3>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* footer */}
        <footer className="bg-[#262626] text-center py-8 text-white border-t-2 border-[#A6A6A6]">
          <p>© 2024 Autobase. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
