import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCountdownTimer from "../hooks/useCountdownTimer";
import { postVerifyEmailRequest, postResendVerificationCodeRequest } from "../services/redux/users/actions";
import * as usersSelector from "../services/redux/users/selectors";

const VerifyEmail = ({ email, onBack }) => {
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");

  const inputRefs = useRef([]);
  const { timer, restartTimer } = useCountdownTimer();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersResponse = useSelector(usersSelector.selectResponse);
  const usersError = useSelector(usersSelector.selectError);
  const usersType = useSelector(usersSelector.selectType);

  useEffect(() => {
    if (usersResponse?.success && usersType == "verifyEmail") {
      sessionStorage.removeItem("_payload");
      sessionStorage.removeItem("verifyEmailSentAt");
      navigate("/login");
    }
  }, [usersResponse, usersType, navigate]);

  useEffect(() => {
    if (usersError) setError(usersError);
  }, [usersError]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    else if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleVerify = () => {
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      dispatch(postVerifyEmailRequest({ email: email, code: fullCode }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleVerify();
  };

  const handleResend = () => {
    if (timer > 0) return;
    restartTimer();
    dispatch(postResendVerificationCodeRequest({ email }));
    setError("");
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-neutral-800 shadow-2xl rounded-lg mt-6 p-8 space-y-6 border border-neutral-700 text-white text-center"
    >
      <h3 className="text-xl font-semibold">Verifica tu email</h3>
      <p className="text-neutral-400 text-sm">
        Ingresa el código que enviamos a <strong>{email}</strong>
      </p>

      <div className="flex justify-center gap-2">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-10 h-12 text-center text-xl rounded bg-neutral-700 text-white border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        ))}
      </div>

      {timer > 0 ? (
        <p className="text-sm text-neutral-400">
          Reenviar código en {formatTime(timer)}
        </p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          className="text-violet-400 hover:text-violet-300 font-medium text-sm"
        >
          Reenviar código
        </button>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex flex-col gap-3 mt-4">
        <button
          type="submit"
          disabled={code.join("").length !== 6}
          className="btn btn-primary w-full bg-violet-600 hover:bg-violet-700 text-white border-none disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verificar
        </button>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-neutral-400 hover:text-neutral-200"
          >
            ← Volver al formulario
          </button>
        )}
      </div>
    </form>
  );
};

export default VerifyEmail;
