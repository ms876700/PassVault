import React from "react";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { RiDeleteBin5Fill, RiEdit2Fill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [form, setform] = useState({ site: "", username: "", password: "" });

  const [passwordArray, setpasswordArray] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)

    if (!token) {
      window.location.href = "/login";
      return;
    }
    getPasswords();
  }, []);

  //getting all passwords
  const getPasswords = async () => {
    let req = await fetch(`${API_URL}/api/passwords`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    let passwords = await req.json();
    console.log(passwords);

    setpasswordArray(passwords);
  };

  //post all passwords
  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      try {
        //  UPDATE if editing
        if (form.id) {
          await fetch(`${API_URL}/api/passwords/${form.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify(form),
          });

          setpasswordArray(
            passwordArray.map((item) => (item.id === form.id ? form : item)),
          );

          toast("Updated successfully!");
        }
        // post new
        else {
          const newId = uuidv4();
          const newData = { ...form, id: newId };

          await fetch(`${API_URL}/api/passwords`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify(newData),
          });

          setpasswordArray([...passwordArray, newData]);

          toast("Saved successfully!");
        }

        setform({ site: "", username: "", password: "" });
      } catch (err) {
        toast("Error saving password");
      }
    } else {
      toast("Fill all fields properly");
    }
  };

  // delete a password
  const deletePassword = async (id) => {
    let c = confirm("Do you really wanna delete this password ? ");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id != id));

      let res = fetch(`${API_URL}/api/passwords/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ id }),
      });

      toast("🦄 Deleted Successfully!");
    }
  };

  const editPassword = (id) => {
    const selected = passwordArray.find((item) => item.id === id);
    setform(selected);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("🦄 Copied to Clipboard!");
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className=" p-3 md:mycontainer  lg:mx-40 md:min-h-[87.05vh] min-h-[87.2vh] ">
        <h1 className="text-4xl font-bold text-center ">
          <span className="text-fuchsia-500">&lt;</span>
          Pass
          <span className="text-fuchsia-500">OP/&gt;</span>
        </h1>
        <p className="text-lg text-fuchsia-900 text-center">
          Your Own Password Manager
        </p>
        <div className=" flex flex-col p-4 text-black gap-6 items-center">
          <input
            placeholder="Enter website URL"
            className="bg-white rounded-full border-fuchsia-400
            border border-solid w-full px-4 py-1"
            type="text"
            value={form.site}
            onChange={handleChange}
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full gap-8 ">
            <input
              placeholder="Enter username"
              className="bg-white rounded-full border-fuchsia-400 border border-solid lg:w-1/2 px-4 py-1"
              type="text"
              value={form.username}
              onChange={handleChange}
              name="username"
              id="username"
            />
            <div className="relative  lg:w-1/2 ">
              <input
                placeholder="Enter password"
                className="bg-white rounded-full border-fuchsia-400 border border-solid w-full px-4 py-1"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                name="password"
                id="password"
              />
              <span
                className="show absolute right-2 top-2.5 cursor-pointer"
                onClick={() => setshowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="w-6" />
                ) : (
                  <FaEye className="w-6" />
                )}
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex items-center justify-center hover:bg-fuchsia-500 rounded-full py-2 px-6 w-fit bg-fuchsia-400 gap-2 border border-fuchsia-800"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-xl pb-4">Your Passwords</h2>
          {passwordArray.length == 0 ? (
            <div>No Passwords to show</div>
          ) : (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-fuchsia-800 text-white">
                <tr>
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-fuchsia-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center w-32 ">
                        <div className="flex justify-center items-center gap-2">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <FaCopy
                            className="size-5 cursor-pointer "
                            onClick={() => copyText(item.site)}
                          />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center w-32">
                        <div className="flex justify-center items-center gap-2">
                          {item.username}
                          <FaCopy
                            className="size-5 cursor-pointer "
                            onClick={() => copyText(item.username)}
                          />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center w-32">
                        <div className="flex justify-center items-center gap-2">
                          {"*".repeat(item.password.length)}
                          <FaCopy
                            className="size-5 cursor-pointer "
                            onClick={() => copyText(item.password)}
                          />
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center w-32">
                        <div className="flex justify-center items-center gap-5">
                          <RiEdit2Fill
                            className="size-5 cursor-pointer "
                            onClick={() => editPassword(item.id)}
                          />
                          <RiDeleteBin5Fill
                            className="size-5 cursor-pointer "
                            onClick={() => deletePassword(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
