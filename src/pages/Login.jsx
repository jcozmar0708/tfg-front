import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import * as authSelector from "../services/redux/auth/selectors";
import {
  clearAuthError,
  postLoginRequest,
} from "../services/redux/auth/actions";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const authResponse = useSelector(authSelector.selectResponse);
  const authLoading = useSelector(authSelector.selectLoading);
  const authError = useSelector(authSelector.selectError);

  useEffect(() => {
    dispatch(clearAuthError());
    sessionStorage.clear();

    return () => {
      dispatch(clearAuthError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (sessionStorage.getItem("_auth-session-token")) {
      navigate("/groups");
    }
  }, [navigate]);

  useEffect(() => {
    if (authError) {
      setError("Usuario o contraseña incorrectos");
    } else {
      setError("");
    }
  }, [authError]);

  useEffect(() => {
    if (authResponse) {
      sessionStorage.setItem("_auth-session-token", authResponse.accessToken);
      navigate("/groups");
    }
  }, [authResponse, navigate]);

  const body = {
    email: email,
    password: password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postLoginRequest(body));
  };

  if (authLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-neutral-800 shadow-2xl rounded-lg p-8 space-y-6 border border-neutral-700">
        <h2 className="text-3xl font-bold text-white text-center">
          Bienvenido a Amedias
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text text-neutral-300">
                Correo electrónico
              </span>
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                placeholder="usuario@email.com"
                className="input input-bordered w-full pr-10 bg-neutral-700 text-white border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <Icon name="email" className="w-5 h-5 text-violet-400" />
              </div>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text text-neutral-300">Contraseña</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="••••••••"
                className="input input-bordered w-full pr-10 bg-neutral-700 text-white border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 inset-y-0 flex items-center"
              >
                <Icon
                  name={showPassword ? "eye-off" : "eye"}
                  className="w-5 h-5 text-violet-400"
                />
              </button>
            </div>
          </div>

          <div className="flex justify-end text-sm mt-1">
            <Link
              to="/forgot-password"
              className="link text-violet-400 hover:text-violet-300"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary w-full bg-violet-600 hover:bg-violet-700 text-white border-none"
          >
            Iniciar sesión
          </button>
        </form>
      </div>

      <div className="mt-6 text-center text-sm text-neutral-400">
        ¿Aún no tienes cuenta?{" "}
        <Link
          to="/register"
          className="ml-1 text-violet-400 hover:text-violet-300 font-medium"
        >
          Regístrate
        </Link>
      </div>
    </div>
  );
};

export default Login;
