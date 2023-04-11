import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="fixed flex h-full w-36 flex-col items-center gap-10 bg-slate-300 pt-10">
      <Link to="/myday">MyDay</Link>
      <Link to="/important">Important</Link>
      <Link to="/planned">Planned</Link>
      <Link to="/tasks">Tasks</Link>
    </div>
  );
};

export default SideBar;
