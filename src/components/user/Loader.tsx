import { ClipLoader } from "react-spinners";

type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center p-5 bg-white rounded-lg shadow-lg">
        <ClipLoader color="#3498db" size={50} />
        <p className="mt-3 text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
