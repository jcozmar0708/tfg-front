import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserRequest,
  getGroupsDetailRequest,
  patchNameRequest,
} from "../services/redux/groups/actions";
import * as groupsSelector from "../services/redux/groups/selectors";
import Loading from "./Loading";
import Icon from "../components/Icon";
import { useNavigate } from "react-router-dom";

const GroupDetail = ({ groupId, profile }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const groupsResponse = useSelector((state) =>
    groupsSelector.selectDetail(state, groupId)
  );
  const groupsLoading = useSelector(groupsSelector.selectLoading);

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

  if (groupsLoading || !groupsResponse) return <Loading />;

  return (
    <div
      className="bg-neutral-800 border border-neutral-700 rounded-lg shadow-md overflow-hidden"
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

      {expanded && (
        <div className="px-4 py-3 space-y-4 text-sm text-white">
          <div>
            <h3 className="font-medium text-neutral-300 mb-2">
              Miembros del grupo
            </h3>
            <ul className="space-y-1">
              {groupsResponse.users.map((user) => (
                <li
                  key={user.email}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1"
                >
                  <div>
                    <span className="text-white block">{user.fullName}</span>
                    <span className="text-neutral-400 text-sm block">
                      {user.email}
                    </span>
                  </div>

                  {isCreator && user.email !== profile?.email && (
                    <button
                      onClick={() => {
                        dispatch(
                          deleteUserRequest({
                            groupUUID: groupId,
                            email: user.email,
                          })
                        );
                        window.location.reload();
                      }}
                      className="p-1 cursor-pointer"
                    >
                      <Icon name="close" className="w-4 h-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

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
                window.location.reload();
              }}
              className="btn bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
            >
              Salir del grupo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetail;
