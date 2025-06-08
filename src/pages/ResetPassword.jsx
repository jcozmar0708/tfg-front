import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import useCountdownTimer from "../hooks/useCountdownTimer";
import { formatTime } from "../helpers/formatTime";
import { useDispatch, useSelector } from "react-redux";
import * as usersSelector from "../services/redux/users/selectors";
import {
  clearUsersResponse,
  clearUsersError,
  postResetPasswordRequest,
  postForgotPasswordRequest,
} from "../services/redux/users/actions";
import Loading from "./Loading";

const ResetPassword = () => {
  const email = sessionStorage.getItem("forgotPasswordEmail");
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const [body, setBody] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { timer, restartTimer } = useCountdownTimer();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const usersResponse = useSelector(usersSelector.selectResponse);
  const usersLoading = useSelector(usersSelector.selectLoading);
  const usersError = useSelector(usersSelector.selectError);
  const usersType = useSelector(usersSelector.selectType);

  useEffect(() => {
    restartTimer();
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearUsersResponse());
      dispatch(clearUsersError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (usersResponse?.success && usersType == "resetPassword") {
      sessionStorage.removeItem("forgotPasswordEmail");
      sessionStorage.removeItem("verifyPasswordSentAt");
      setError("");
      navigate("/login");
    }
  }, [usersResponse, usersType, navigate]);

  useEffect(() => {
    if (usersError) setError(usersError);
  }, [usersError]);

  const handleChange = (e) => {
    setBody((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCodeChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullCode = code.join("");
    if (body.password !== body.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (body.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (fullCode.length !== 6) {
      setError("El código es incorrecto");
      return;
    }

    dispatch(
      postResetPasswordRequest({
        email: email,
        code: fullCode,
        newPassword: body.password,
      })
    );
  };

  const handleResend = () => {
    if (timer > 0) return;
    restartTimer();
    dispatch(postForgotPasswordRequest({ email }));
    setError("");
  };

  const handleBack = () => {
    navigate("/forgot-password");
  };

  if (usersLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-neutral-800 shadow-2xl rounded-lg p-8 space-y-6 border border-neutral-700 text-white">
        <h2 className="text-2xl font-bold text-center">Nueva contraseña</h2>
        <p className="text-sm text-neutral-400 text-center">
          Ingresa el código enviado a <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-12 text-center text-xl rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            ))}
          </div>

          {timer > 0 ? (
            <p className="text-sm text-neutral-400 text-center">
              Reenviar código en {formatTime(timer)}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-violet-400 hover:text-violet-300 font-medium text-sm block mx-auto"
            >
              Reenviar código
            </button>
          )}

          <div className="form-control">
            <label htmlFor="password" className="label text-neutral-300">
              Nueva contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={body.password}
                onChange={handleChange}
                className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
                required
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
            <label htmlFor="confirmPassword" className="label text-neutral-300">
              Confirmar nueva contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={body.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
                required
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

          <div className="flex flex-col gap-3 mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full bg-violet-600 hover:bg-violet-700 text-white border-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cambiar contraseña
            </button>

            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-neutral-400 hover:text-neutral-200"
            >
              ← Volver al formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
