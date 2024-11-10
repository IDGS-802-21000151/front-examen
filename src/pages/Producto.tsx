import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Rating } from "primereact/rating";
import { Product } from "../models/product";
import axios from "axios";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useToast } from "../contexts/ToastContext";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";

export default function Producto() {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Product | null>(null);
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/items/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!producto) {
    return (
      <ProgressBar mode="indeterminate" style={{ height: "6px" }}></ProgressBar>
    );
  }

  async function addSale(): Promise<void> {
    try {
      if (producto) {
        const response = await axios.post("addSale", {
          idProducto: producto.id,
        });

        if (response.data.ventaCreada === true) {
          toast.current?.show({
            severity: "success",
            summary: "Tu compra se ha registrado correctamente!",
            detail: "Gracias por tu compra :)",
            life: 3000,
          });
          navigate("/sales");
        }
      }
    } catch (error) {
      console.error("Error al añadir la venta:", error);
    }
  }

  const productUrl = `${window.location.origin}/items/${producto.id}`;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    productUrl
  )}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    productUrl
  )}&text=${encodeURIComponent(producto.title)}`;

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
            placeholder="Busqueda..."
            value={busqueda}
            className="w-full"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBusqueda(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/items?search=${busqueda}`);
              }
            }}
          />
        </IconField>
      </div>

      <Card
        title={
          <div className="flex justify-content-between gap-3">
            <p>{producto.title}</p>
            <p>{producto.category}</p>
          </div>
        }
        header={
          <div className="flex align-items-center justify-content-center">
            <img
              src={producto.images[0]}
              className="w-3 h-18rem"
              alt={producto.title}
            />
          </div>
        }
      >
        <p>{producto.description}</p>

        <div className="flex justify-content-between align-items-center mt-3">
          <p className="text-2xl font-bold">${producto.price}</p>
          <Rating value={producto.rating} readOnly cancel={false} />
        </div>

        <button
          className="p-button p-button-success w-full mt-2 uppercase"
          onClick={addSale}
        >
          <span>Comprar</span>
        </button>

        <div className="flex justify-content-around mt-3">
          <Button
            icon="pi pi-facebook"
            label="Compartir en Facebook"
            className="p-button-primary"
            onClick={() => window.open(facebookShareUrl, "_blank")}
          />
          <Button
            icon="pi pi-twitter"
            label="Compartir en X"
            className="p-button-info"
            onClick={() => window.open(twitterShareUrl, "_blank")}
          />
        </div>
      </Card>
    </>
  );
}
