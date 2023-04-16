import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const Details = ({ pokeman, styles }) => {
  const statsObject = pokeman.stats.reduce((acc, statObj) => {
    acc[statObj.stat.name.replace("-", " ")] = statObj.base_stat;
    return acc;
  }, {});

  return (
    <Layout title={pokeman.name}>
      <div className="px-8 py-2">
        <Link href="/">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold p-4 rounded-full">
            <FaArrowLeft size={25} />
          </button>
        </Link>
      </div>
      <div className="p-8 flex flex-wrap sm:flex-nowrap justify-center mx-auto">
        <div className="mr-2">
          <img src={pokeman.sprites.other.home.front_default} alt="pokemon" />
        </div>
        <div className="flex-1 max-w-xl">
          <p className="text-3xl font-semibold">
            <span className="mr-4">{`#${pokeman.id
              .toString()
              .padStart(3, "0")}`}</span>
            <span>{pokeman.name}</span>
          </p>
          <div className="my-6">
            <p className="mt-2">
              <span className="font-bold">Height: &nbsp;</span>
              <span>{pokeman.height / 10} m</span>
            </p>
            <p>
              <span className="font-bold">Weight: &nbsp;</span>
              <span>{pokeman.weight / 10} kg</span>
            </p>
          </div>
          <p className="my-8">
            {pokeman.types.map((type, index) => {
              return (
                <span
                  key={type + index}
                  className="text-white text-xl font-medium mr-2 px-4 p-2 rounded-2xl"
                  style={{
                    backgroundColor: styles[type.type.name],
                  }}
                >
                  {type.type.name}
                </span>
              );
            })}
          </p>

          <div>
            {Object.keys(statsObject).map((stat, index) => {
              let statPercentFactor = 0;
              let statColor = "";

              // console.log("STAT:", stat);

              switch (stat) {
                case "hp":
                  statPercentFactor = 2.55;
                  statColor = "#da4343";
                  break;
                case "attack":
                  statPercentFactor = 1.81;
                  statColor = "#f38d45";
                  break;
                case "defense":
                  statPercentFactor = 2.3;
                  statColor = "#f3d14a";
                  break;
                case "special attack":
                  statPercentFactor = 1.73;
                  statColor = "#547fe4";
                  break;
                case "special defense":
                  statPercentFactor = 2.3;
                  statColor = "#84df57";
                  break;
                case "speed":
                  statPercentFactor = 2.0;
                  statColor = "#f75887";
                  break;
              }

              return (
                <div key={stat}>
                  <div className="flex justify-between">
                    <span className="font-medium">{stat.toUpperCase()}:</span>
                    <span>{statsObject[stat]}</span>
                  </div>
                  <div className="h-6 w-full bg-gray-700 mb-1 rounded">
                    <div
                      className="h-6 rounded"
                      style={{
                        backgroundColor: statColor,
                        width: `${
                          Number(statsObject[stat]) * statPercentFactor
                        }px`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${query.id}`
    );
    const data = await response.json();
    const { moves, game_indices, ...dataWithoutMoves } = data;

    // console.log(dataWithoutMoves);

    return {
      props: {
        pokeman: dataWithoutMoves,
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

export default Details;
