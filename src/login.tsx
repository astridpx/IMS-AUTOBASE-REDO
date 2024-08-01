import { useState } from "react";
import axios from "./lib/axios";

// interface
interface ReponseInterface {
  success: boolean;
  user: {
    username: string;
    token: string;
  };
}

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Form submit
  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const { data }: { data: ReponseInterface } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        {
          username,
          password,
        }
      );

      if (data) {
        localStorage.setItem("token", data.user.token);
        setLoading(false);
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      {/* <main className="relative min-h-screen"> */}
      <div className=" flex items-center bg-fixed bg-cover justify-center w-full h-screen bg-[url('./assets/bg.jpg')] bg-center bg-no-repeat min-h-screen">
        <div className="container ">
          <div className="flex h-full">
            <div className="mx-auto">
              <h1 className="mb-6 text-6xl font-semibold text-center text-white/100">
                Log In.
              </h1>
              <div className="px-16 py-12 mx-auto bg-white/50 rounded-xl backdrop-blur-lg">
                <form
                  onSubmit={(e) => HandleSubmit(e)}
                  className="flex flex-col gap-4 py-8 md:min-w-[500px] md:gap-12"
                >
                  <input
                    type="text"
                    name="username"
                    placeholder="Your Username"
                    className={`${
                      error ? "border-red-500" : "border-white"
                    } text-xl leading-7 text-center text-opacity-100 bg-transparent border-b-2 outline-none  placeholder:text-white/100 text-white/100`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="password"
                    name="username"
                    placeholder="Your Password"
                    className={`${
                      error ? "border-red-500" : "border-white"
                    } text-xl leading-7 text-center text-opacity-100 bg-transparent border-b-2  outline-none placeholder:text-white/100 text-white/100`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${
                      loading
                        ? "bg-[rgba(166,166,166,1)]"
                        : "bg-[rgba(38,38,38,1)]"
                    } text-white/100 px-20 py-1 leading-7 text-lg border-transparent rounded-lg hover:boder-2 hover:outline-offset-2 hover:border-yellow-200/55 hover:border-opacity-100 hover:shadow-btn-shadow focus:shadow-btn-shadow`}
                  >
                    {loading ? "PROCESSING..." : "LOG IN"}
                  </button>
                </form>
                {error && (
                  <p className="text-center text-red-500">Invalid input.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </main> */}
    </>
  );
}
