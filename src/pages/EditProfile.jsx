import { useEffect, useState } from "react";
import Icon from "../components/Icon";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileRequest,
  patchUpdateProfileRequest,
  clearUsersError,
  clearUsersResponse,
} from "../services/redux/users/actions";
import * as usersSelector from "../services/redux/users/selectors";
import { formatPhoneNumber } from "../helpers/formatPhoneNumber";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const usersResponse = useSelector(usersSelector.selectResponse);
  const usersLoading = useSelector(usersSelector.selectLoading);
  const usersError = useSelector(usersSelector.selectError);

  const [body, setBody] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    dispatch(getProfileRequest());
    return () => {
      dispatch(clearUsersError());
      dispatch(clearUsersResponse());
    };
  }, [dispatch]);

  useEffect(() => {
    if (usersResponse) {
      setBody((prev) => ({
        ...prev,
        fullName: usersResponse.fullName ?? "",
        phone: usersResponse.phone ?? "",
      }));
    }
  }, [usersResponse]);

  useEffect(() => {
    if (usersError) setError(usersError);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (body.password && body.password !== body.confirmPassword) {
      return setError("Las contraseñas no coinciden");
    }

    if (body.password && body.password.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres");
    }

    const payload = {
      fullName: body.fullName ?? usersResponse.fullName,
      phone: body.phone ?? usersResponse.phone,
    };

    if (body.password) payload.password = body.password;

    dispatch(patchUpdateProfileRequest(payload));

    setError("");
  };

  if (usersLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-neutral-800 shadow-2xl rounded-lg p-8 space-y-6 border border-neutral-700">
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold mb-1">Editar perfil</h2>
          <p className="text-neutral-400 text-sm">
            Actualiza tu información personal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
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
              className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
            />
          </div>

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
                placeholder="••••••••"
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
            <label htmlFor="confirmPassword" className="label text-neutral-300">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={body.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
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

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={() => navigate("/groups")}
              className="text-sm text-neutral-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary bg-violet-600 hover:bg-violet-700 text-white border-none"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
