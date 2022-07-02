import React, { useEffect, useState } from "react";
import "./App.css";
import useForm from "./Forms/FormControl";
import axios from "axios";
import { Users } from "./Users";
import Maps from "./Components/Maps";
import Loading from "./Components/Loading";
import Select from "./Components/Select";
import Input from "./Components/Input";
import {
  validateBody,
  validateText,
  validateUserID,
} from "./ValidationFunctions";

function App() {
  const [users, setUsers] = useState<Users[]>([]);
  const [coordinate, setCoordinate] = useState({
    lat: 0,
    long: 0,
  });
  const formMakerList = [
    { name: "userID", type: "select", selectValues: users, label: "User ID" },
    { name: "body", type: "text", label: "Name" },
    { name: "title", type: "text", label: "Title" },
  ];
  const former = useForm({
    initialValues: {
      userID: {
        value: 0,
        validateErrorFunctions: [validateUserID],
      },
      body: {
        value: "",
        validateErrorFunctions: [validateBody],
      },
      title: {
        value: "",
        validateErrorFunctions: [validateText],
      },
    },
    onSubmit: async (values) => {
      console.log("Submitting");

      const { userID, body, title } = values;

      const req = await axios.post(
        "https://jsonplaceholder.typicode.com/api/posts",
        {
          title: title.value,
          body: body.value,
          userId: userID.value,
        }
      );
    },
  });

  const getUserDetails = (userID: string | number) => {
    if (userID === "0") {
      return;
    }
    const user = users.find((user) => user.id.toString() === userID);
    if (!user) {
      return {};
    }

    setCoordinate({
      lat: parseFloat(user.address.geo.lat) as number,
      long: parseFloat(user.address.geo.lng) as number,
    });
  };

  useEffect(() => {
    const initFunction = async () => {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(data.data);
    };
    initFunction();
  }, []);

  useEffect(() => {
    let userID = former.values.userID.value;
    getUserDetails(userID);
  }, [former.values.userID]);

  return users.length ? (
    <div className="grid place-items-center m-10">
      <form onSubmit={former.onSubmitFormWithAddedValidation}>
        {formMakerList.map((item) => {
          return (
            <div key={item.name} className="form-control w-full max-w-xs">
              <label htmlFor={item.name + item.type} className="label">
                <span className="label-text">{item.label}</span>
              </label>
              {item.type === "select" ? (
                <Select
                  former={former}
                  item={item}
                  values={users}
                  key={item.name}
                />
              ) : (
                <Input former={former} item={item} key={item.name} />
              )}
              <div className="text-red-600 text-center p-2">
                {former.errors[item.name]}
              </div>
            </div>
          );
        })}

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      <Maps {...coordinate} />
    </div>
  ) : (
    <Loading active={Boolean(users)} />
  );
}

export default App;
