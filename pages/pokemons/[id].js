import Layout from "@/components/Layout";
import React from "react";

const Details = ({ pokeman, styles }) => {
  console.log(pokeman);
  return (
    <Layout title={pokeman.name.english}>
      <div className="min-h-screen p-8 flex flex-wrap sm:flex-nowrap justify-center mx-auto">
        <div className="flex-1 mr-2">
          <img src={pokeman.image.hires} alt="pokemon" />
        </div>
        <div className="flex-1">
          <p className="text-3xl font-semibold">
            <span className="mr-4">{`#${pokeman.id
              .toString()
              .padStart(3, "0")}`}</span>
            <span>{pokeman.name.english}</span>
          </p>
          <p className="text-sm">
            <span>{pokeman.name.japanese} · </span>
            <span>{pokeman.name.chinese} · </span>
            <span>{pokeman.name.french}</span>
          </p>
          <p className="my-4">
            <span className="font-bold">Species: &nbsp;</span>
            <span>{pokeman.species}</span>
          </p>
          <p>
            <span className="font-bold">Description: &nbsp;</span>
            <span>{pokeman.description}</span>
          </p>
          <div className="my-6">
            <p className="mt-2">
              <span className="font-bold">Height: &nbsp;</span>
              <span>{pokeman.profile.height}</span>
            </p>
            <p>
              <span className="font-bold">Weight: &nbsp;</span>
              <span>{pokeman.profile.weight}</span>
            </p>
          </div>
          <p className="my-8">
            {pokeman.type.map((type, index) => {
              return (
                <span
                  key={type + index}
                  className="text-white text-xl font-medium mr-2 px-4 p-2 rounded-2xl"
                  style={{
                    backgroundColor: styles[type.toLowerCase()],
                  }}
                >
                  {type}
                </span>
              );
            })}
          </p>
          <div>
            {Object.keys(pokeman.base).map((stat, index) => {
              let statPercentFactor = 0;
              let statColor = "";

              switch (stat) {
                case "HP":
                  statPercentFactor = 2.55;
                  statColor = "#da4343";
                  break;
                case "Attack":
                  statPercentFactor = 1.81;
                  statColor = "#f38d45";
                  break;
                case "Defense":
                  statPercentFactor = 2.3;
                  statColor = "#f3d14a";
                  break;
                case "Sp. Attack":
                  statPercentFactor = 1.73;
                  statColor = "#547fe4";
                  break;
                case "Sp. Defense":
                  statPercentFactor = 2.3;
                  statColor = "#84df57";
                  break;
                case "Speed":
                  statPercentFactor = 2.0;
                  statColor = "#f75887";
                  break;
              }

              return (
                <div key={stat}>
                  <div className="flex justify-between">
                    <span>{stat.toUpperCase()}</span>
                    <span>{pokeman.base[stat]}</span>
                  </div>
                  <div className="h-4 w-full bg-gray-700 mb-1">
                    <div
                      className="h-4"
                      style={{
                        backgroundColor: statColor,
                        width: `${
                          Number(pokeman.base[stat]) * statPercentFactor
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
      `https://api.pikaserve.xyz/pokemon/${query.id}`
    );
    const data = await response.json();
    return {
      props: {
        pokeman: data,
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
