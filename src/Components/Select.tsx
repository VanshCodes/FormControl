import React from "react";
import { InputType } from "../Helpers/TypesHelper";

export default function Select({
  item,
  former,
  values,
}: {
  item: InputType;
  former: any;
  values: any;
}) {
  return (
    <select
      id={item.name + item.type}
      className="select select-bordered w-full max-w-x"
      name={item.name}
      value={former.values[item.name].value}
      onChange={former.handleChange}
    >
      <option value={"0"}>Choose Your User</option>

      {values.map((item: any) => {
        return (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
}
