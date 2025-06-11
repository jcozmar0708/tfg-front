import { Link } from "react-router-dom";
import Icon from "../components/Icon";

const CancelPayment = () => {
  sessionStorage.removeItem("_debtId");

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-neutral-800 shadow-2xl rounded-lg p-8 space-y-6 border border-neutral-700 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Icon name="amedias" className="w-16 h-16 text-violet-500" />
          <h1 className="text-4xl font-bold text-white">
            Se ha cancelado el pago o ha ocurrido un error
          </h1>
          <h2 className="text-xl font-semibold text-white">
            Inténtalo de nuevo
          </h2>
        </div>

        <Link
          to="/groups"
          className="btn btn-primary mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white border-none"
        >
          Volver a grupos
        </Link>
      </div>
    </div>
  );
};

export default CancelPayment;
