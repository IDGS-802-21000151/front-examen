import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import axios from "axios";
import { Product } from "../models/product";
import { Card } from "primereact/card";
import { Rating } from "primereact/rating";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";

export default function Resultados() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const navigate = useNavigate();
  const toast = useToast();

  const [busqueda, setBusqueda] = useState("");

  const [productos, setProductos] = useState<Product[]>([]);

  const obtenerResultados = async () => {
    const response = await axios.get<Product[]>("/items?q=" + searchQuery);
    setProductos(response.data);
  };

  useEffect(() => {
    if (!searchQuery) {
      toast.current?.show({
        severity: "warn",
        summary: "Falta la busqueda!",
        detail: "Es necesario que realices una busqueda",
        life: 3000,
      });

      navigate(`/`);
    } else {
      obtenerResultados();
    }
  }, [searchQuery, navigate]);

  return (
    <div>
      <div className="flex w-full align-items-center justify-content-center gap-3 mb-5">
        <i
          className="pi pi-shopping-cart text-3xl text-white"
          onClick={() => navigate("/")}
        ></i>

        <IconField iconPosition="left" className="w-full">
          <InputIcon className="pi pi-search"> </InputIcon>
          <InputText
            v-model="value1"
            placeholder="Busqueda..."
            value={busqueda}
            className="w-full"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setBusqueda(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/items?search=${busqueda}`);
              }
            }}
          />
        </IconField>
      </div>

      <div className="grid gap-3 justify-content-center align-items-center">
        {productos.map((producto) => (
          <Card
            className="col-5 cursor-pointer"
            key={producto.id}
            title={
              <div className="flex justify-content-between gap-3">
                <p>{producto.title}</p>
                <p>{producto.category}</p>
              </div>
            }
            header={
              <div className="flex align-items-center justify-content-center">
                <img src={producto.images[0]} className="w-3 h-8rem" />
              </div>
            }
            onClick={() => navigate(`/items/${producto.id}`)}
          >
            <p>{producto.description}</p>

            <div className="flex justify-content-between">
              <p className="text-2xl font-bold">${producto.price}</p>
              <Rating value={producto.rating} readOnly cancel={false} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
