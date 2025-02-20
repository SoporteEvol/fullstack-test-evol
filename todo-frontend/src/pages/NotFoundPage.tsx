import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="text-lg">Página no encontrada</p>
      <Link to="/" className="mt-4 text-blue-500 underline">
        Volver al inicio
      </Link>
    </div>
  );
};
