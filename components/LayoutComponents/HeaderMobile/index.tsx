import BusinessSelectModal from "./BusinessSelectModal";

const HeaderMobile = () => {
  return (
    <div
      className="
        flex justify-between px-5 fixed top-0 w-full bg-white  p-2 border-b border-slate-500 border-solid z-20"
    >
      <BusinessSelectModal />
    </div>
  );
};

export default HeaderMobile;
