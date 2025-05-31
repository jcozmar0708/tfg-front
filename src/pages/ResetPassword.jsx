import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import useCountdownTimer from "../hooks/useCountdownTimer";

const ResetPassword = () => {
  const email = sessionStorage.getItem("forgotPasswordEmail") || "";
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { timer, restartTimer } = useCountdownTimer();
  const navigate = useNavigate();

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
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (fullCode.length !== 6) {
      setError("El código es incorrecto");
      return;
    }

    try {
      // Simular llamada al backend
      await new Promise((res) => setTimeout(res, 500));
      sessionStorage.removeItem("forgotPasswordEmail");
      sessionStorage.removeItem("verifyEmailSentAt");
      navigate("/login");
    } catch {
      setError("Error al cambiar la contraseña");
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-neutral-800 shadow-2xl rounded-lg p-8 space-y-6 border border-neutral-700 text-white">
        <h2 className="text-2xl font-bold text-center">Nueva contraseña</h2>
        <p className="text-sm text-neutral-400 text-center">
          Ingresa el código enviado a <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              onClick={restartTimer}
              className="text-violet-400 hover:text-violet-300 font-medium text-sm block mx-auto"
            >
              Reenviar código
            </button>
          )}

          <div className="form-control">
            <label htmlFor="newPassword" className="label text-neutral-300">
              Nueva contraseña
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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

          <button
            type="submit"
            className="btn btn-primary w-full bg-violet-600 hover:bg-violet-700 text-white border-none"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
