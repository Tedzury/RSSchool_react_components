import { useState } from 'react';

export default function ErrorThrower() {
  const [isError, setIsError] = useState(false);

  if (isError) {
    throw new Error("OMG, you've pressed a button!");
  }
  return (
    <div className="mt-5 flex justify-center">
      <button
        type="button"
        className="w-[300px] rounded-md bg-blue_20 px-2 py-1 font-bold transition-all duration-300 hover:bg-purple_20"
        onClick={() => setIsError(true)}
      >
        Throw an error!
      </button>
    </div>
  );
}
