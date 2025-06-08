import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import Loading from "./Loading";
import {
  clearGroupsResponse,
  clearGroupsError,
  postCreateGroupRequest,
} from "../services/redux/groups/actions";
import * as groupsSelector from "../services/redux/groups/selectors";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [emails, setEmails] = useState([""]);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

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
    if (isCreating && groupsResponse) {
      dispatch(clearGroupsResponse());
      navigate("/groups");
      window.location.reload();
    }
  }, [groupsResponse, isCreating, navigate]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!groupName.trim())
      return setError("El nombre del grupo es obligatorio.");

    if (groupName.length < 3)
      return setError(
        "El nombre del grupo debe de tener una longitud mínima de 3 caracteres"
      );

    setIsCreating(true);

    dispatch(
      postCreateGroupRequest({
        name: groupName,
        emails: emails,
      })
    );
  };

  if (groupsLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-neutral-800 shadow-2xl rounded-lg p-8 space-y-6 border border-neutral-700">
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold mb-1">Crear nuevo grupo</h2>
          <p className="text-neutral-400 text-sm">
            Invita a miembros por correo electrónico
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div className="form-control">
            <label htmlFor="groupName" className="label text-neutral-300 mb-2">
              Nombre del grupo
            </label>
            <input
              id="groupName"
              name="groupName"
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
              placeholder="Ej. Grupo 1"
              className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="label text-neutral-300">
              Miembros (emails)
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
            >
              Crear grupo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
