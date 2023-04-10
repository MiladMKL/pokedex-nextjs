import Layout from "@/components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home({ pokeData, styles }) {
  const [searchResults, setSearchResults] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  /* useEffects
  -------------------------------------------------------- */
  useEffect(() => {
    fetchPokemons(pageNumber);
  }, [pageNumber]);

  const fetchPokemons = async (page) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`
    );
    const { results } = await response.json();
    const hasMoreResults = (page + 1) * 20 < 898;
    setHasMore(hasMoreResults);

    const pokemonsWithoutMoves = await Promise.all(
      results.map(async (pokemon) => {
        const pokemonData = await (await fetch(pokemon.url)).json();
        const { moves, game_indices, ...dataWithoutMoves } = pokemonData;
        return dataWithoutMoves;
      })
    );

    setSearchResults(pokemonsWithoutMoves);
  };

  /* handlers
  -------------------------------------------------------- */
  const handlePrevious = () => {
    if (pageNumber > 0) {
      setPageNumber((currentPage) => currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasMore) {
      setPageNumber((currentPage) => currentPage + 1);
    }
  };

  /* Render
  -------------------------------------------------------- */
  return (
    <Layout title="Pokedex">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap justify-center mx-auto">
          {searchResults.map((pokeman, index) => {
            return (
              <div key={pokeman.name} className="p-4">
                <Link href={`/pokemons/${pokeman.id}`}>
                  <div className="bg-gray-100 py-8 px-6 rounded-lg">
                    <img
                      src={pokeman.sprites.other.home.front_default}
                      className="h-[152px] w-[152px] sm:w-[200px] sm:h-[200px] mb-4"
                    />
                    <div className="text-center">
                      {pokeman.types.map((type, index) => {
                        return (
                          <span
                            key={type + index}
                            className="text-white text-xs font-medium mr-2 px-4 py-1.5 rounded-full"
                            style={{
                              backgroundColor: styles[type.type.name],
                            }}
                          >
                            {type.type.name}
                          </span>
                        );
                      })}
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-2xl">{pokeman.name}</p>
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
            class="inline-flex items-center px-4 py-2 text-sm md:text-lg font-medium text-white bg-gray-800 rounded-l hover:bg-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={handlePrevious}
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
            Previous
          </button>
          <button
            class="inline-flex items-center px-4 py-2 text-sm md:text-lg font-medium text-white bg-gray-800 border-0 border-l border-gray-600 rounded-r hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={handleNext}
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
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    return {
      props: {
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
