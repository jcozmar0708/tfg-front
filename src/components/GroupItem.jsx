const GroupItem = ({ group, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`w-full cursor-pointer flex items-center justify-between px-4 py-3 hover:bg-neutral-700 transition ${
        isActive ? "bg-neutral-700" : ""
      }`}
    >
      <span className="font-medium text-white truncate">{group.name}</span>
    </div>
  );
};

export default GroupItem;
