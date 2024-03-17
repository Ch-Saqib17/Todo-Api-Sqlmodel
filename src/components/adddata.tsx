"use client";
import axios from "axios";
import React, { useState } from "react";

const Baseurl = "https://todo-api-sqlmodel.vercel.app/";

const Adddata = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handelsubmit = async () => {
    try {
      if ([name, description]) {
        const res = await axios.post(`https://todo-api-sqlmodel.vercel.app/todo/add`, {
          name: name,
          description: description,
        });

        console.log(res.data);
      }
    } catch (error) {
      console.error("Error on posting:", error);
    }
  };

  return (
    <form className="relative flex items-center text-sm mb-5">
      <div className="flex-row">
        <input
          type="text"
          placeholder="Your message..."
          name="entry"
          id="todoInput"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="pl-4  py-2 mt-1 focus:ring-teal-500 focus:border-teal-500 block  w-[560px]  border-neutral-300 rounded-md bg-gray-100  text-neutral-900"
        />
        <input
          type="text"
          placeholder="Your message..."
          name="entry"
          id="todoInput"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="pl-4  py-2 mt-1 focus:ring-teal-500 focus:border-teal-500 block w-[560px] border-neutral-300 rounded-md bg-gray-100  text-neutral-900"
        />
      </div>
      <button
        onClick={handelsubmit}
        type="button"
        className="flex items-center justify-center absolute right-2 mt-1 font-medium  bg-teal-500/30 text-neutral-900 -100 rounded-full w-7 h-7"
      >
        <svg
          viewBox="0 0 1024 1024"
          fill="currentColor"
          height="1em"
          width="1em"
        >
          <path d="M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2-8.5 2.1-13.8 10.7-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z" />
        </svg>
      </button>
    </form>
  );
};

export default Adddata;
