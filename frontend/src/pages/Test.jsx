import { useParams } from "react-router-dom";


const Test = () => {
    const { userId } = useParams();
    return (
      <div className="bg-black text-white absolute top-[30rem]">
        <p>ID: </p>
        <p>{userId}</p>
      </div>
    );
  };

export default Test;
