import ChessClock from "@/Components/chessClock";

export default function Home() {
      return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="p-4 bg-white rounded-lg shadow-md w-2/4 h-3/6">
          <h1 className="text-3xl font-bold text-center mb-4">Chess Clock</h1>
          <ChessClock />
        </div>
      </div>
      );
      
    }
