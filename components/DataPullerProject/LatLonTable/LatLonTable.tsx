import React from "react";

type Props = {
  type: string;
  location: string;
};

type Location = {
  latitude: number;
  longitude: number;
};

const LatLongTableDesktop: React.FC<{ location: Location }> = ({ location }) => {
  return (
    <table className="md:block hidden font-mono">
      <tbody className="border-2  md:text-sm text-xs">
        <tr className="border-2">
          <td className="border-2 px-4 py-2">Latitude</td>
          <td className="border-2 px-4 py-2">{location.latitude}</td>
        </tr>
        <tr className="border-2">
          <td className="border-2 px-4 py-2">Longitude</td>
          <td className="border-2 px-4 py-2">{location.longitude}</td>
        </tr>
      </tbody>
    </table>
  );
};

const LatLongTableMobile: React.FC<{ location: Location }> = ({ location }) => {
  return (
    <table className="md:hidden block font-mono">
      <tbody className="border-2  md:text-sm text-xs">
        <tr className="border-2">
          <td className="border-2 px-4 py-2">Latitude</td>
          <td className="border-2 px-4 py-2">{location.latitude}</td>
        </tr>
        <tr className="border-2">
          <td className="border-2 px-4 py-2">Longitude</td>
          <td className="border-2 px-4 py-2">{location.longitude}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default function LatLonTable(props: Props) {
  switch (props.type) {
    case "Desktop":
      return <LatLongTableDesktop location={JSON.parse(props.location)} />;
    case "Mobile":
      return <LatLongTableMobile location={JSON.parse(props.location)} />;
    default:
      return null;
  }
}
