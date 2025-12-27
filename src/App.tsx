import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState({ id: "", advice: "" });
  const [loading, setLoading] = useState(true);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice(data.slip);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="flex h-screen flex-col justify-center p-4">
      <div className="max-w-lg min-w-full md:min-w-lg mx-auto">
        <div className="flex flex-col justify-center gap-6 rounded-xl bg-blue-900 text-center px-6 md:px-12 pt-12 pb-16 relative">
          {loading ? (
            <LoaderCircle className="animate-spin mx-auto" />
          ) : (
            <>
              <p className="text-green-300 uppercase text-xs tracking-[0.2rem]">
                advice #{advice?.id}
              </p>
              <p className="text-2xl">"{advice?.advice}"</p>
              <img
                src="/images/pattern-divider-mobile.svg"
                alt="divider"
                className="block sm:hidden"
              />
              <img
                src="/images/pattern-divider-desktop.svg"
                alt="divider"
                className="hidden sm:block"
              />
            </>
          )}
          <button
            type="button"
            className="bg-green-300 rounded-full w-14 h-14 md:w-12 md:h-12 text-center flex justify-center absolute bottom-[-1.8rem] md:bottom-[-1.6rem] left-0 right-0 mx-auto cursor-pointer hover:shadow-[0_0_30px_rgba(134,239,172,0.5)]"
            onClick={fetchAdvice}
          >
            <img
              src="/images/icon-dice.svg"
              alt="dice"
              className="w-5 h-5 self-center"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
