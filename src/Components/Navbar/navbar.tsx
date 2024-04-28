import { navLists } from "../../constants";
import { appleImg, bagImg, searchImg } from "../../utils";

const Navbar = () => {
  return (
    <header className=" w-full flex justify-between  py-5 sm:px-10 px-5 items-center">
      <nav className="w-full flex screen-max-width">
        <img src={appleImg} alt="Apple" width={14} height={18} />
        <section className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item) => {
            return (
              <div
                key={item}
                className="text-gray  hover:text-white transition-all px-5 cursor-pointer"
              >
                {item}
              </div>
            );
          })}
        </section>
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="Search" width={14} height={18} />
          <img src={bagImg} alt="Bag" width={14} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
