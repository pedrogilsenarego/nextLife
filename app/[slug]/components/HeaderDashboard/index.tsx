import MainValue from "../MainValue";

const HeaderDashboard = () => {
  return (
    <>
      <nav
        className="w-full  flex justify-center border-b border-b-foreground/10 h-16 fixed top-0 z-10"
        style={{ backgroundColor: "#ffffffE6" }}
      ></nav>
      <div className="w-full max-w-screen-2xl flex justify-start items-center py-2 text-sm fixed z-30 top-0">
        <MainValue />
      </div>
    </>
  );
};

export default HeaderDashboard;
