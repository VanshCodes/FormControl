import React from "react";
import { InputType } from "../Helpers/TypesHelper";

export default function Input({
  former,
  item,
}: {
  former: any;
  item: InputType;
}) {
  return (
    <input
      id={item.name + item.type}
      onChange={former.handleChange}
      className="input input-bordered w-full max-w-xs"
      type={item.type}
      name={item.name}
      value={former.values[item.name].value}
    />
  );
}
