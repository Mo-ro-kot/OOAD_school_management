import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between  p-2 border-b border-blue-200 bg-white">
        <button
          onClick={() => {
            navigate("/homePage");
          }}
        >
          logo
        </button>
        <input
          type="text"
          placeholder="Search for class"
          className=" ml-20 w-200 h-10 rounded-full border-2 border-blue-300 px-4 text-sm focus:outline-none focus:border-blue-500 transition duration-150"
        />
        <button
          onClick={() => {
            navigate("/profilePage");
          }}
          className=" mr-10 w-8 h-8 rounded-full bg-blue-200 flex justify-center items-center cursor-pointer hover:bg-blue-300 transition duration-150"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
            fill="#1b7fed" // Blue-700 equivalent
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0 2c-2.673 0-8 1.337-8 4v2h16v-2c0-2.663-5.327-4-8-4z" />
          </svg>
        </button>
      </header>
    </>
  );
}
