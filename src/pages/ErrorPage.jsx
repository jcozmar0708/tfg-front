import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Icon from "../components/Icon";

const statusMessages = {
  403: {
    title: "Acceso denegado",
    message: "No tienes permisos para acceder a esta página.",
  },
  404: {
    title: "Página no encontrada",
    message: "La página que buscas no existe o ha sido movida.",
  },
  500: {
    title: "Error del servidor",
    message: "Ha ocurrido un error inesperado. Inténtalo más tarde.",
  },
};

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState(404);

  useEffect(() => {
    const statusParam = parseInt(searchParams.get("status") || "404", 10);
    setStatus(statusMessages[statusParam] ? statusParam : 404);
  }, [searchParams]);

  const { title, message } = statusMessages[status];

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-neutral-800 shadow-2xl rounded-lg p-8 space-y-6 border border-neutral-700 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Icon name="amedias" className="w-16 h-16 text-violet-500" />
          <h1 className="text-4xl font-bold text-white">Error {status}</h1>
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-neutral-400 text-sm">{message}</p>
        </div>

        <Link
          to="/"
          className="btn btn-primary mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white border-none"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
