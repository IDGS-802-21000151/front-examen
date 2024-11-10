import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inicio() {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const handleBuscar = async () => {
    navigate(`/items?search=${busqueda}`);
  };

  return (
    <div className="flex align-items-center justify-content-center h-screen">
      <div className="flex flex-column">
        <div className="flex justify-content-center align-items-center">
          <i
            className="pi pi-shopping-cart border-1 border-circle p-5 border-white text-white"
            style={{ fontSize: "2rem" }}
            onClick={() => navigate("/")}
          ></i>
        </div>

        <h1 className="text-6xl font-light text-center text-white">
          Bazar online
        </h1>

        <IconField iconPosition="left">
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText
            v-model="value1"
            placeholder="Busqueda..."
            value={busqueda}
            className="w-full"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setBusqueda(e.target.value);
            }}
          />
        </IconField>

        <Button
          label="Buscar"
          className="mt-3"
          severity="contrast"
          onClick={handleBuscar}
        />
      </div>
    </div>
  );
}
