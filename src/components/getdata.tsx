"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface IData {
  id: number;
  name: string;
  description: string;
}

// const Baseurl = "http://127.0.0.1:8000";

const Baseurl = "http://127.0.0.1:8000/";

const GetData = () => {
  const [data, setData] = useState<IData[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Baseurl}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async (id: number) => {
    try {
      await axios.delete(`${Baseurl}/todo/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const updateData = async (
    id: number,
    updatedName: string,
    updatedDescription: string
  ) => {
    try {
      await axios.put(`${Baseurl}/todo/update/${id}`, {
        name: updatedName,
        description: updatedDescription,
      });
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" overflow-auto h-[400px] ">
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg p-6 shadow-md mb-8 flex-row md:items-center justify-between"
        >
          <div className="text-lg md:flex-grow font-semibold mb-6 md:mb-0 flex  gap-52">
            <div className="flex-row">
              <div>Name</div>
              {item.name}
            </div>
            <div className="flex-row">
              <div>Description</div>
              {item.description}
            </div>
          </div>
          <div className="flex items-center mt-2 ">
            <div className="flex-row">
              <input
                type="text"
                placeholder="Write Text Here ....."
                onChange={(e) =>
                  updateData(item.id, e.target.value, e.target.value)
                }
                className="border p-2 rounded mr-2 w-[450px]"
              />
              <input
                type="text"
                placeholder="Write Text Here ....."
                onChange={(e) =>
                  updateData(item.id, e.target.value, e.target.value)
                }
                className="border p-2 rounded mr-2 w-[450px]"
              />
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => deleteData(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetData;
// "use client";
// import axios from "axios";
// import { useEffect, useState } from "react";

// interface IData {
//   id: number;
//   name: string;
// }

// const Baseurl = process.env.NEXT_PUBLIC_BASE_URL;

// const GetData = () => {
//   const [data, setData] = useState<IData[]>([]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${Baseurl}`);
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className=" overflow-auto h-[400px] ">
//       {data.map((item) => (
//         <div
//           key={item.id}
//           className="bg-white rounded-lg p-6 shadow-md mb-8 flex-row md:items-center justify-between"
//         >
//           <div className="text-lg md:flex-grow font-semibold mb-6 md:mb-0">
//             {item.name}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GetData;
