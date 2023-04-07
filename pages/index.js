import Layout from "@/components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home({ pokeData, styles }) {
  const [searchResults, setSearchResults] = useState(pokeData);
  const [pokeArray, setPokeArray] = useState(searchResults.slice(0, 20));
  const [pageNumber, setPageNumber] = useState(0);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  /* ---------------------------- useEffects */
  useEffect(() => {
    setPokeArray(searchResults.slice(pageNumber * 20, pageNumber * 20 + 20));
  }, [pageNumber, searchResults]);

  useEffect(() => {
    if (input.length === 0 && filter === "All") {
      setSearchResults(pokeData);
    }

    if (input.length !== 0 && filter === "All") {
      setSearchResults((c) =>
        pokeData.filter((pokeman) => {
          return pokeman.name.english
            .toLowerCase()
            .includes(input.toLowerCase());
        })
      );
    }

    if (input.length === 0 && filter !== "All") {
      setSearchResults(() =>
        pokeData.filter((pokeman) => {
          return pokeman.type.includes(filter);
        })
      );
    }

    if (input.length !== 0 && filter !== "All") {
      setSearchResults(() =>
        pokeData.filter((pokeman) => {
          return (
            pokeman.type.includes(filter) &&
            pokeman.name.english.toLowerCase().includes(input.toLowerCase())
          );
        })
      );
    }
  }, [input, filter]);

  /* ---------------------------- Handlers */
  const handlePrevious = () => {
    setPageNumber((currentPage) => currentPage - 1);
  };

  const handleNext = () => {
    setPageNumber((currentPage) => currentPage + 1);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  /* ---------------------------- Render */
  return (
    <Layout title="WebPokedex">
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center pt-12 w-[80%]">
          <input
            type="text"
            placeholder="Search"
            className="mx-8 w-full sm:3/4 bg-gray-100 px-6 py-2 rounded-lg"
            onChange={handleInputChange}
            value={input}
          />
        </div>

        <div className="flex px-8 sm:px-16 py-4 items-center">
          <label
            htmlFor="types"
            className="block mr-6 font-semibold text-gray-900 text-base"
          >
            Types:
          </label>
          <select
            name="types"
            id="types"
            // defaultValue={"All"}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 sm:p-2.5"
            onChange={handleFilterChange}
            value={filter}
          >
            <option value="All">All</option>
            <option value="Normal">Normal</option>
            <option value="Fire">Fire</option>
            <option value="Water">Water</option>
            <option value="Electric">Electric</option>
            <option value="Grass">Grass</option>
            <option value="Ice">Ice</option>
            <option value="Fighting">Fighting</option>
            <option value="Poison">Poison</option>
            <option value="Ground">Ground</option>
            <option value="Flying">Flying</option>
            <option value="Psychic">Psychic</option>
            <option value="Bug">Bug</option>
            <option value="Rock">Rock</option>
            <option value="Ghost">Ghost</option>
            <option value="Dragon">Dragon</option>
            <option value="Dark">Dark</option>
            <option value="Steel">Steel</option>
            <option value="Fairy">Fairy</option>
          </select>
        </div>
        <div className="flex flex-wrap justify-center mx-auto">
          {/* <div className="flex flex-wrap justify-evenly border-2 m-14 border-violet-900 rounded-xl py-4"> */}
          {pokeArray.map((pokeman, index) => {
            return (
              <div key={pokeman.name.english} className="p-4">
                <Link href={`/pokemons/${pokeman.id}`}>
                  <div className="bg-gray-100 py-8 px-6 rounded-lg">
                    <img
                      src={pokeman.image.hires}
                      className="h-[152px] w-[152px] sm:w-[200px] sm:h-[200px] mb-4"
                    />
                    <div className="text-center">
                      {pokeman.type.map((type, index) => {
                        return (
                          <span
                            key={type + index}
                            className="text-white text-xs font-medium mr-2 px-4 py-1.5 rounded-full"
                            style={{
                              backgroundColor: styles[type.toLowerCase()],
                            }}
                          >
                            {type}
                          </span>
                        );
                      })}
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-2xl">{pokeman.name.english}</p>
                      <p className="font-bold text-2xl">{`#${pokeman.id
                        .toString()
                        .padStart(3, "0")}`}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="inline-flex m-8 xs:mt-0">
          <button
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={handlePrevious}
            disabled={pageNumber === 0 ? true : false}
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Prev
          </button>
          <button
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-600 rounded-r hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={handleNext}
            disabled={searchResults.length / 20 - pageNumber < 1 ? true : false}
          >
            Next
            <svg
              aria-hidden="true"
              class="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* <div className="container mx-auto flex flex-wrap justify-between p-4">
        <button
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700"
          onClick={handlePrevious}
          disabled={pageNumber === 0 ? true : false}
        >
          Previous
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-700"
          onClick={handleNext}
          disabled={searchResults.length / 20 - pageNumber < 1 ? true : false}
        >
          Next
        </button>
      </div> */}
      {/* </div> */}
    </Layout>
  );
}

export async function getStaticProps({}) {
  try {
    const response = await fetch("https://api.pikaserve.xyz/pokemon/all");
    const data = await response.json();
    return {
      props: {
        pokeData: data,
        styles: {
          normal: "#A8A77A",
          fire: "#EE8130",
          water: "#6390Fe",
          electric: "#F7D02C",
          grass: "#7AC74C",
          ice: "#96D9D6",
          fighting: "#C22E28",
          poison: "#A33EA1",
          ground: "#E2BF65",
          flying: "#A98FF3",
          psychic: "#F95587",
          bug: "#A6891A",
          rock: "#B6A136",
          ghost: "#735797",
          dragon: "#6F35FC",
          dark: "#705746",
          steel: "#8787CE",
          fairy: "#D685AD",
        },
      },
    };
  } catch (error) {
    console.log(error);
  }
}
