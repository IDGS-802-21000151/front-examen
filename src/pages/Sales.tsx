import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Sale } from "../models/sales";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("/sales");
        setSales(response.data);
      } catch (error) {
        console.error("Error al obtener las ventas:", error);
      }
    };

    fetchSales();
  }, []);

  if (!sales.length) {
    return (
      <ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
    );
  }

  return (
    <>
      <div className="flex w-full align-items-center justify-content-center gap-3 mb-5">
        <i
          className="pi pi-shopping-cart text-3xl text-white cursor-pointer"
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

      <div className="flex flex-wrap gap-4 justify-content-center">
        {sales.map((sale) => (
          <Card
            key={sale.id}
            className="col-5 cursor-pointer"
            title={
              <div className="flex justify-content-between gap-3">
                <p>{sale.title}</p>
                <p>{sale.category}</p>
              </div>
            }
            header={
              <div className="flex align-items-center justify-content-center">
                <img
                  src={sale.images[0]}
                  alt={sale.title}
                  className="w-3 h-8rem"
                />
              </div>
            }
          >
            <p>{sale.description}</p>
            <p className="mt-1 text-sm text-gray-500">
              Fecha de compra: {new Date(sale.fechacompra).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>
    </>
  );
}
