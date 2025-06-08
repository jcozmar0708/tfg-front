import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import Loading from "./Loading";
import {
  postAddUsersRequest,
  clearGroupsResponse,
  clearGroupsError,
} from "../services/redux/groups/actions";
import * as groupsSelector from "../services/redux/groups/selectors";

const AddUsersToGroup = () => {
  const { groupUUID } = useParams();
  const [emails, setEmails] = useState([""]);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const groupsResponse = useSelector(groupsSelector.selectResponse);
  const groupsLoading = useSelector(groupsSelector.selectLoading);

  useEffect(() => {
    return () => {
      dispatch(clearGroupsResponse());
      dispatch(clearGroupsError());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSending && groupsResponse) {
      dispatch(clearGroupsResponse());
      setEmails([""]);
      setIsSending(false);
      navigate("/groups");
    }
  }, [groupsResponse, isSending, dispatch, navigate]);

  const handleChangeEmail = (index, value) => {
    const updated = [...emails];
    updated[index] = value;
    setEmails(updated);
  };

  const handleAddEmail = () => {
    setEmails((prev) => [...prev, ""]);
  };

  const handleRemoveEmail = (index) => {
    setEmails((prev) => prev.filter((_, i) => i !== index));
  };

  const validateEmails = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emails.some((email) => !email.trim()))
      return "Todos los campos de email deben estar completos.";
    if (emails.some((email) => !emailRegex.test(email)))
      return "Uno o más correos tienen un formato inválido.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateEmails();
    if (validationError) return setError(validationError);

    setError("");
    setIsSending(true);

    dispatch(
      postAddUsersRequest({
        groupUUID,
        body: {
          emails: emails,
        },
      })
    );
  };

  if (groupsLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-neutral-800 shadow-2xl rounded-lg p-8 space-y-6 border border-neutral-700">
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold mb-1">Añadir usuarios</h2>
          <p className="text-neutral-400 text-sm">
            Invita a nuevos miembros al grupo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="space-y-2">
            <label htmlFor="email" className="label text-neutral-300">
              Correos electrónicos
            </label>
            {emails.map((email, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleChangeEmail(index, e.target.value)}
                  placeholder={`usuario${index + 1}@email.com`}
                  className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
                />
                {emails.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEmail(index)}
                    title="Eliminar"
                    className="text-red-400 hover:text-red-300"
                  >
                    <Icon name="trash" className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddEmail}
              className="text-violet-400 hover:text-violet-300 text-sm mt-1"
            >
              + Añadir otro correo
            </button>
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
              disabled={isSending}
            >
              {isSending ? "Invitando..." : "Invitar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUsersToGroup;
