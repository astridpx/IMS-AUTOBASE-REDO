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
  const [filterYears, setFilterYears] = useState<string>("");
  const [filterOrigins, setFilterOrigins] = useState<string>("");

  useEffect(() => {
    // fetch cars
    const fetchCars = async () => {
      const { data } = await axios.get("/cars", {
        params: {
          search: filterSearch,
          make: filterMakes,
          origin: filterOrigins,
          releaseFrom: filterYears,
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
  }, [filterMakes, filterOrigins, filterSearch, filterYears, searchParams]);
  return (
    <>
      <main className="">
        <div className="bg-[#262626] py-8">
          <Navbar />
        </div>

        <div className="mt-32 text-center ">
          <div className="w-max border-b-4 border-[#F9E4A9] mx-auto px-4  ">
            <h2 className="text-[3.2rem] font-bold text-center text-wrap">
              What can we do for you?
            </h2>
          </div>
        </div>

        {/* Filter */}
        <section className="container relative z-10 px-4 pb-32 mx-auto shadow-lg mt-14">
          <div className="pb-4 mx-auto mb-8 shadow-md">
            <div className="border-b-2 border-[#A6A6A6] w-[50rem] mx-auto pb-1">
              <input
                type="text"
                placeholder="I'm looking for a..."
                className="w-full py-2 text-[#A6A6A6] font-semibold placeholder:font-semibold placeholder:text-[#A6A6A6]  text-4xl border-none focus:border-none outline-none text-center"
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
              />
            </div>
          </div>

          {/* dropdown */}
          <div className="flex px-4 space-x-8">
            <Dropdown
              options={make}
              placeholder="All Makes"
              setSelect={setFilterMakes}
            />
            <Dropdown
              options={origin}
              placeholder="All Origins"
              setSelect={setFilterOrigins}
            />
            <Dropdown
              options={years}
              placeholder="All Years"
              setSelect={setFilterYears}
            />
          </div>
        </section>

        {/*  */}
        <section className="bg-[#262626] min-h-80  pb-24">
          <div className="container px-4 mx-auto">
            <div className="relative flex justify-center w-full ">
              <div className="absolute w-full max-w-2xl px-12 py-8 text-3xl font-bold text-center -translate-y-2 bg-white rounded-lg h-max">
                <h1>{cars?.length} cars found:</h1>
              </div>
            </div>

            {/* CAR CARDS Wrapper*/}
            <div className="grid grid-cols-3 gap-8 pt-44 ">
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
