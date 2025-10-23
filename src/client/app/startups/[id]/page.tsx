"use client" // toda vez que usar useEffect
import { useEffect, useState } from "react";

export default function Startup() {
  const id = "pegar o parametro da rota";

  const [data, setData] = useState<any | undefined>(undefined);
  const [isEdited, setIsEdited] = useState(false);

  async function fetchStartup() {
    // chama a api de verdade
    const response = await fetch(`http://localhost:3000/fetch/${id}`)

    setData(response.json())
    setIsEdited(false)
  }

  async function editStartup() {
    await fetch(`http://localhost:3000/edit/${data}`);
  }

  useEffect(() => {
    fetchStartup();
  }, []);

  useEffect(() => {
    editStartup();
  }, [data]);

  return <>
    <h1>{data?.nome}</h1>

    <button onClick={editStartup}>
        Salvar
    </button>
  </>;
}
