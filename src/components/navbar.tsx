import Logos from "./logo";

export default function Navbar() {
  // Logout function
  const HandleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <nav className="flex items-center px-4 text-white">
        {/* <img src={Logo} alt="logo" width={300} /> */}
        <Logos />

        <span
          onClick={HandleLogout}
          className="text-lg font-bold cursor-pointer"
        >
          Logout
        </span>
      </nav>
    </>
  );
}
