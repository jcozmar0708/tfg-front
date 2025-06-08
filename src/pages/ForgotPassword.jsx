import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import {
  clearUsersError,
  clearUsersResponse,
  postForgotPasswordRequest,
} from "../services/redux/users/actions";
import { useDispatch, useSelector } from "react-redux";
import * as usersSelector from "../services/redux/users/selectors";
import Loading from "./Loading";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const usersResponse = useSelector(usersSelector.selectResponse);
  const usersLoading = useSelector(usersSelector.selectLoading);

  useEffect(() => {
    dispatch(clearUsersResponse());
    const stored = sessionStorage.getItem("forgotPasswordEmail");

    if (stored) {
      setEmail(stored);
    }

    return () => {
      dispatch(clearUsersResponse());
      dispatch(clearUsersError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (usersResponse) {
      sessionStorage.setItem("forgotPasswordEmail", email);
      sessionStorage.setItem("verifyPasswordSentAt", Date.now());
      navigate("/reset-password");
    }
  }, [usersResponse, email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sessionStorage.getItem("forgotPasswordEmail"))
      navigate("/reset-password");
    else {
      dispatch(postForgotPasswordRequest({ email }));
    }
  };

  if (usersLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-neutral-800 shadow-2xl rounded-lg p-8 space-y-6 border border-neutral-700 text-white">
        <h2 className="text-2xl font-bold text-center">Recuperar contraseña</h2>
        <p className="text-sm text-neutral-400 text-center">
          Ingresa tu correo para recibir un código de recuperación.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="form-control">
            <label htmlFor="email" className="label text-neutral-300">
              Correo electrónico
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@email.com"
                required
                className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
              />
              <div className="absolute right-3 top-3 pointer-events-none">
                <Icon name="email" className="w-5 h-5 text-violet-400" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full bg-violet-600 hover:bg-violet-700 text-white border-none"
          >
            Enviar código
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
