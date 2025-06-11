import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserRequest,
  getGroupsDetailRequest,
  patchNameRequest,
} from "../services/redux/groups/actions";
import * as groupsSelector from "../services/redux/groups/selectors";
import * as expensesSelector from "../services/redux/expenses/selectors";
import * as paymentsSelector from "../services/redux/payments/selectors";
import {
  clearExpensesResponse,
  clearExpensesError,
  getUserDebtsRequest,
  postCreateExpenseRequest,
  postPayInCashRequest,
} from "../services/redux/expenses/actions";
import { postOrderRequest } from "../services/redux/payments/actions";
import Loading from "./Loading";
import Icon from "../components/Icon";
import { useNavigate } from "react-router-dom";

const GroupDetail = ({ groupId, profile }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formEmails, setFormEmails] = useState([]);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const groupsResponse = useSelector((state) =>
    groupsSelector.selectDetail(state, groupId)
  );
  const groupsLoading = useSelector(groupsSelector.selectLoading);

  const expensesResponse = useSelector(expensesSelector.selectResponse);
  const expensesLoading = useSelector(expensesSelector.selectLoading);
  const expensesType = useSelector(expensesSelector.selectType);

  const paymentsResponse = useSelector(paymentsSelector.selectResponse);
  const paymentsLoading = useSelector(paymentsSelector.selectLoading);

  sessionStorage.setItem("_selectedGroupId", groupId);

  useEffect(() => {
    if (expensesResponse && expensesType === "createExpense") {
      navigate("/groups");
      window.location.reload();
    }
  }, [expensesResponse, expensesType, navigate]);

  useEffect(() => {
    if (paymentsResponse) window.location.href = paymentsResponse.approveLink;
  }, [paymentsResponse]);

  useEffect(() => {
    const queryParams = new Map([["groupUUID", groupId]]);

    dispatch(getUserDebtsRequest(queryParams));

    return () => {
      dispatch(clearExpensesResponse());
      dispatch(clearExpensesError());
    };
  }, [dispatch, groupId]);

  useEffect(() => {
    if (!groupsResponse) dispatch(getGroupsDetailRequest(groupId));
    else setName(groupsResponse.name);
  }, [dispatch, groupId, groupsResponse]);

  const isCreator = profile?.email === groupsResponse?.creator;

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(name.length, name.length);
    }
  }, [editing, name]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editing &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setEditing(false);
        if (name !== groupsResponse.name) {
          const payload = {
            groupUUID: groupId,
            body: {
              name: name,
            },
          };
          dispatch(patchNameRequest(payload));
          window.location.reload();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editing, name, dispatch, groupId, groupsResponse]);

  const handleSubmitExpense = (e) => {
    e.preventDefault();
    dispatch(
      postCreateExpenseRequest({
        title: formTitle,
        amount: parseFloat(formAmount),
        participants: formEmails,
        groupUUID: groupId,
      })
    );
    setShowForm(false);
    setFormTitle("");
    setFormAmount("");
    setFormEmails([""]);
  };

  if (
    groupsLoading ||
    !groupsResponse ||
    (expensesLoading && expensesType === "debts") ||
    paymentsLoading
  )
    return <Loading />;

  return (
    <div
      className="relative bg-neutral-800 border border-neutral-700 rounded-lg shadow-md overflow-hidden"
      ref={containerRef}
    >
      <div
        role="button"
        tabIndex={0}
        className="w-full text-left flex items-center justify-between px-4 py-3 cursor-pointer bg-neutral-900 hover:bg-neutral-800 transition-colors"
        onClick={() => setExpanded((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setExpanded((prev) => !prev);
          }
        }}
      >
        <div className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2">
          {editing ? (
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-neutral-800 text-white border-b border-violet-500 outline-none"
            />
          ) : (
            <>
              <h2 className="m-0">{groupsResponse.name}</h2>
              {isCreator && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditing(true);
                  }}
                  className="p-0 m-0 bg-transparent border-none"
                >
                  <Icon
                    name="edit"
                    className="w-5 h-5 text-violet-400 hover:text-violet-300 transition-colors"
                  />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {!expanded && (
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-5 right-5 bg-violet-600 hover:bg-violet-700 text-white rounded-full p-4 shadow-lg z-50"
        >
          <Icon name="plus" className="w-6 h-6" />
        </button>
      )}

      {expanded && (
        <div className="px-4 py-3 space-y-4 text-sm text-white relative">
          {groupsResponse.users && groupsResponse.users.length > 0 && (
            <div>
              <h3 className="text-neutral-300 font-medium mb-2">
                Participantes
              </h3>
              <ul className="space-y-2">
                {groupsResponse.users.map((user) => (
                  <li
                    key={user.email}
                    className="flex justify-between items-center bg-neutral-700 px-4 py-2 rounded"
                  >
                    <div>
                      <p className="text-white font-medium">
                        {user.name || user.email}
                      </p>
                      <p className="text-sm text-neutral-400">{user.email}</p>
                    </div>
                    {isCreator && user.email !== profile?.email && (
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(
                            deleteUserRequest({
                              groupUUID: groupId,
                              email: user.email,
                            })
                          );
                          window.location.reload();
                        }}
                        className="text-red-400 hover:text-red-200"
                        title="Eliminar participante"
                      >
                        <Icon name="close" className="w-5 h-5" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 pt-2 border-t border-neutral-700">
            {isCreator && (
              <button
                onClick={() => navigate(`/groups/${groupId}/add-users`)}
                className="btn bg-violet-600 hover:bg-violet-700 text-white w-full sm:w-auto"
              >
                Añadir participantes
              </button>
            )}
            <button
              onClick={() => {
                dispatch(
                  deleteUserRequest({
                    groupUUID: groupId,
                    email: profile?.email,
                  })
                );
                sessionStorage.removeItem("_selectedGroupId");
                window.location.reload();
              }}
              className="btn bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
            >
              Salir del grupo
            </button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
          <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-lg max-w-md w-full space-y-4">
            <h3 className="text-white text-lg font-semibold">Nuevo gasto</h3>
            <form onSubmit={handleSubmitExpense} className="space-y-4">
              <input
                type="text"
                placeholder="Título del gasto"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
                className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Cantidad (€)"
                value={formAmount}
                onChange={(e) => setFormAmount(e.target.value)}
                required
                className="input input-bordered w-full bg-neutral-700 text-white border-neutral-600"
              />

              <div>
                <p className="text-sm text-neutral-300 mb-1">
                  Participantes seleccionados:
                </p>
                <div className="flex flex-wrap gap-2">
                  {formEmails.map((email) => (
                    <div
                      key={email}
                      className="flex items-center bg-violet-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      <span>{email}</span>
                      <button
                        type="button"
                        className="ml-2 text-white hover:text-red-300"
                        onClick={() => {
                          setFormEmails((prev) =>
                            prev.filter((e) => e !== email)
                          );
                        }}
                      >
                        <Icon name="close" className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-neutral-300 mb-1">
                  Seleccionar participantes:
                </p>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {groupsResponse.users
                    ?.filter(
                      (user) =>
                        !formEmails.includes(user.email) &&
                        user.email !== profile?.email
                    )
                    .map((user) => (
                      <button
                        type="button"
                        key={user.email}
                        onClick={() => {
                          setFormEmails((prev) => [...prev, user.email]);
                        }}
                        className="bg-neutral-700 text-white px-3 py-1 rounded-full text-sm hover:bg-violet-600 transition"
                      >
                        {user.email}
                      </button>
                    ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormEmails();
                    window.location.reload();
                  }}
                  className="text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={formEmails.length === 0}
                  className="btn bg-violet-600 hover:bg-violet-700 text-white"
                >
                  Añadir gasto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {!expanded && (
        <div className="p-4 border-t border-neutral-700 bg-neutral-900 text-white space-y-3">
          {expensesResponse?.length > 0 && expensesType === "debts" ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {expensesResponse.map((debt) => (
                <div
                  key={debt._id}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-2 mb-4">
                    <h4 className="text-lg font-semibold text-white">
                      {debt.title}
                    </h4>
                    <p className="text-red-400 text-sm break-words truncate max-w-full">
                      Debes {debt.amount.toFixed(2)}€ a {debt.toEmail}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <button
                      onClick={() => {
                        dispatch(postPayInCashRequest({ debtId: debt._id }));
                        window.location.reload();
                      }}
                      className="btn bg-green-600 hover:bg-green-700 text-white w-full"
                    >
                      Pagado en efectivo
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          postOrderRequest({ amount: debt.amount.toString() })
                        );
                        sessionStorage.setItem("_debtId", debt._id);
                      }}
                      className="btn w-full text-white"
                      style={{
                        background: "#0070BA",
                        backgroundImage:
                          "linear-gradient(180deg, #0070BA 0%, #1546A0 100%)",
                      }}
                    >
                      Paypal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-neutral-400 space-y-4">
              <Icon name="amedias" className="w-16 h-16 text-violet-500" />
              <p className="text-lg font-semibold text-white">
                No tienes pagos pendientes
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupDetail;
