import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as groupsSelector from "../services/redux/groups/selectors";
import {
  clearGroupsResponse,
  clearGroupsError,
  getGroupsRequest,
  postJoinGroupRequest,
} from "../services/redux/groups/actions";
import { deleteLogoutRequest } from "../services/redux/auth/actions";
import GroupItem from "../components/GroupItem";
import GroupDetail from "./GroupDetail";
import Loading from "./Loading";
import Icon from "../components/Icon";
import useIsMobile from "../hooks/useIsMobile";
import {
  clearUsersError,
  clearUsersResponse,
  getProfileRequest,
} from "../services/redux/users/actions";
import * as usersSelector from "../services/redux/users/selectors";

const GroupsList = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const hasJoinedWithToken = useRef(false);

  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const menuRef = useRef(null);

  const dispatch = useDispatch();

  const groupsResponse = useSelector(groupsSelector.selectResponse);
  const groupsLoading = useSelector(groupsSelector.selectLoading);

  const usersResponse = useSelector(usersSelector.selectResponse);

  useEffect(() => {
    const inviteToken = sessionStorage.getItem("_invite-token");

    if (typeof inviteToken === "string") {
      sessionStorage.removeItem("_invite-token");

      if (!hasJoinedWithToken.current) {
        hasJoinedWithToken.current = true;
        dispatch(postJoinGroupRequest(inviteToken));
      }
    }

    dispatch(getProfileRequest());
    dispatch(getGroupsRequest());

    return () => {
      dispatch(clearGroupsResponse());
      dispatch(clearGroupsError());
      dispatch(clearUsersResponse());
      dispatch(clearUsersError());
    };
  }, [dispatch]);

  const handleSelectGroup = (groupId) => {
    setSelectedGroupId(groupId);
  };

  const handleLogout = () => {
    dispatch(deleteLogoutRequest());
    localStorage.removeItem("_auth-session-token");
    navigate("/login");
  };

  const handleBackToList = () => {
    setSelectedGroupId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (groupsLoading || !groupsResponse) return <Loading />;

  const filteredGroups = groupsResponse.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-neutral-900 text-white">
      {(!isMobile || !selectedGroupId) && (
        <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-neutral-700 bg-neutral-800 flex flex-col overflow-y-auto">
          <div className="p-4 border-b border-neutral-700 flex items-center justify-between">
            <span className="text-lg font-semibold">Tus grupos</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/groups/create-group")}
                className="text-violet-400 hover:text-violet-300"
                title="Crear grupo"
              >
                <Icon name="plus" />
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="focus:outline-none"
                  title="Perfil"
                >
                  <Icon
                    name="user-circle"
                    className="w-6 h-6 text-neutral-400 hover:text-white"
                  />
                </button>
                {menuOpen && (
                  <div className="fixed top-16 right-4 w-40 bg-neutral-800 border border-neutral-700 rounded-md shadow-lg z-50 md:absolute md:top-auto md:right-0 md:mt-2">
                    <button
                      onClick={() => {
                        navigate("/edit-profile");
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-neutral-700 text-sm"
                    >
                      Editar perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-600 text-sm text-red-300"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-neutral-700">
            <input
              type="text"
              placeholder="Buscar grupo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-700 text-white rounded-md border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group) => (
                <GroupItem
                  key={group.uuid}
                  group={group}
                  onClick={() => handleSelectGroup(group.uuid)}
                  isActive={selectedGroupId === group.uuid}
                />
              ))
            ) : (
              <div className="text-neutral-400 text-center py-6">
                No se encontraron grupos.
              </div>
            )}
          </div>
        </aside>
      )}

      {(!isMobile || selectedGroupId) && (
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {isMobile && selectedGroupId && (
            <button
              onClick={handleBackToList}
              className="mb-4 text-sm text-violet-400 hover:text-violet-300"
            >
              ← Volver a grupos
            </button>
          )}
          {selectedGroupId ? (
            <GroupDetail groupId={selectedGroupId} profile={usersResponse} />
          ) : (
            !isMobile && (
              <div className="text-neutral-400 text-center mt-20">
                Selecciona un grupo para ver los detalles.
              </div>
            )
          )}
        </main>
      )}
    </div>
  );
};

export default GroupsList;
