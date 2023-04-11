const NavBar = () => {
  return (
    <div className="fixed top-0 flex w-full items-center justify-between bg-slate-600 pl-12 pr-12 text-slate-300">
      <p>ToDo</p>
      <input className="m-2 w-96"></input>
      <p>Settings</p>
    </div>
  );
};

export default NavBar;
