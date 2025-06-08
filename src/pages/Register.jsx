import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import VerifyEmail from "./VerifyEmail";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUsersResponse,
  clearUsersError,
  postRegisterRequest,
} from "../services/redux/users/actions";
import * as usersSelector from "../services/redux/users/selectors";
import Loading from "./Loading";
import { formatPhoneNumber } from "../helpers/formatPhoneNumber";

const Register = () => {
  const [step, setStep] = useState("form");

  const [body, setBody] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const usersResponse = useSelector(usersSelector.selectResponse);
  const usersLoading = useSelector(usersSelector.selectLoading);
  const usersError = useSelector(usersSelector.selectError);
  const usersType = useSelector(usersSelector.selectType);

  useEffect(() => {
    const stored = sessionStorage.getItem("_payloadRegister");
    const sentAt = sessionStorage.getItem("verifyEmailSentAt");

    if (stored && sentAt) {
      setBody(JSON.parse(stored));
      setStep("verify");
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearUsersResponse());
      dispatch(clearUsersError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (usersResponse && usersType == "register") {
      if (!sessionStorage.getItem("verifyEmailSentAt"))
        sessionStorage.setItem("verifyEmailSentAt", Date.now());

      sessionStorage.setItem("_payloadRegister", JSON.stringify(body));

      setError("");
      setStep("verify");
    }
  }, [usersResponse, usersType]);

  useEffect(() => {
    if (usersError) {
      setError(usersError);
    }
  }, [usersError]);

  const handleChange = (e) => {
    setBody((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoneChange = (e) => {
    const cleaned = e.target.value.replace(/[^\d+]/g, "");
    const formatted = formatPhoneNumber(cleaned);
    setBody((prev) => ({
      ...prev,
      phone: formatted,
    }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (body.password !== body.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (body.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    dispatch(
      postRegisterRequest({
        fullName: body.fullName,
        phone: body.phone,
        email: body.email,
        password: body.password,
      })
    );
  };

  if (usersLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-10">
      {step === "form" && (
        <div className="w-full max-w-md bg-neutral-800 shadow-2xl rounded-lg p-8 space-y-6 border border-neutral-700">
          <div className="text-white text-center">
            <h2 className="text-3xl font-bold mb-1">Crea tu cuenta</h2>
            <p className="text-neutral-400 text-sm">Únete a Amedias</p>
          </div>

          <div className="w-full bg-neutral-700 rounded-full h-2 overflow-hidden">
            <div className="h-2 bg-violet-500 transition-all duration-500 w-1/2" />
          </div>

          <form
            onSubmit={handleRegisterSubmit}
            className="space-y-4"
            autoComplete="off"
          >
            <div className="form-control">
              <label htmlFor="fullName" className="label text-neutral-300">
                Nombre completo
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={body.fullName}
                onChange={handleChange}
                required
                placeholder="Nombre Apellidos"
                className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
              />
            </div>

            <div className="form-control">
              <label htmlFor="phone" className="label text-neutral-300">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={body.phone}
                onChange={handlePhoneChange}
                required
                placeholder="XXXXXXXXX"
                className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
              />
            </div>

            <div className="form-control">
              <label htmlFor="email" className="label text-neutral-300">
                Correo electrónico
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={body.email}
                  onChange={handleChange}
                  required
                  placeholder="usuario@email.com"
                  className="input input-bordered w-full pr-10 bg-neutral-700 text-white border-neutral-600"
                />
                <div className="absolute right-3 top-3 pointer-events-none">
                  <Icon name="email" className="w-5 h-5 text-violet-400" />
                </div>
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="password" className="label text-neutral-300">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={body.password}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3"
                >
                  <Icon
                    name={showPassword ? "eye-off" : "eye"}
                    className="w-5 h-5 text-violet-400"
                  />
                </button>
              </div>
            </div>

            <div className="form-control">
              <label
                htmlFor="confirmPassword"
                className="label text-neutral-300"
              >
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={body.confirmPassword}
                  onChange={handleChange}
                  required
                  className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-3"
                >
                  <Icon
                    name={showConfirmPassword ? "eye-off" : "eye"}
                    className="w-5 h-5 text-violet-400"
                  />
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="btn btn-primary w-full bg-violet-600 hover:bg-violet-700 text-white border-none"
            >
              Continuar
            </button>
          </form>
        </div>
      )}

      {step === "verify" && (
        <VerifyEmail
          email={body.email}
          onBack={() => {
            setError("");
            setStep("form");
          }}
        />
      )}
    </div>
  );
};

export default Register;
