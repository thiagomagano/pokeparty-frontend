import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import api from "../services/api";

import Nav from "../components/Nav";
import TeamItem from "../components/TeamItem";

export default function Partys() {
  const { auth } = useAuth();
  const [partys, setPartys] = useState([]);
  const [user, setUser] = useState("");

  async function getAllPartysByUser(user) {
    const userLocal = JSON.parse(localStorage.getItem("u"));
    setUser();
    const response = await api.get("/party", {
      params: {
        userId: user.id || userLocal.id,
      },
    });
    const data = await response?.data;
    setPartys(data);
  }

  useEffect(() => {
    getAllPartysByUser(auth);
  }, []);

  return (
    <div>
      <Nav />
      <ul className="partys">
        {partys &&
          partys.map((party, index) => {
            return (
              <li key={index} className="partys-item">
                <h2>
                  #{index + 1} - {party.title}
                </h2>

                <ul className="pokemons-party">
                  {party.pokemons.map((poke, index) => (
                    <TeamItem key={index} pokemon={poke} inBuilder={false} />
                  ))}
                </ul>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
