import { Link, useSearchParams } from "react-router-dom";
import Icon from "../components/Icon";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { postCaptureRequest } from "../services/redux/payments/actions";

const PaymentSuccess = () => {
  debugger
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();

  const token = searchParams.get("token");

  const hasDispatched = useRef(false);

  useEffect(() => {
    const debtId = sessionStorage.getItem("_debtId");
    sessionStorage.removeItem("_debtId");
    if (token && !hasDispatched.current) {
      hasDispatched.current = true;
      dispatch(postCaptureRequest({ orderId: token, debtId: debtId }));
    }
  }, [token, dispatch]);

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-neutral-800 shadow-2xl rounded-lg p-8 space-y-6 border border-neutral-700 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Icon name="amedias" className="w-16 h-16 text-violet-500" />
          <h1 className="text-4xl font-bold text-white">
            Pago realizado correctamente
          </h1>
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

export default PaymentSuccess;
