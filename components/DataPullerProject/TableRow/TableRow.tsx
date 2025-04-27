import React from "react";

type Props = {
  item: {
    title: string;
    value: string;
  };
};

// repeated  table row code for setting General Information ip address,city,Zip Code ...etc
export default function TableRow(props: Props) {
  return (
    <tr className="border-2">
      <td className="border-2 py-1 px-8">{props.item.title} :</td>
      <td className="text-AAsecondary px-8">{props.item.value}</td>
    </tr>
  );
}
