import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";

import { Table } from "react-bootstrap";

import { tide_location, tide_data } from "./types";

const TideLocationDataPage: React.FC = () => {
  const [location, setLocation] = useState<tide_location | undefined>();
  const [tides, setTides] = useState<tide_data[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("", {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setLocation(data.location);
        setTides(data.tides);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    const timer = setInterval(fetchData, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Table>
        <thead>
          {location && (
            <tr>
              <td>
                <a href={`/tides/${location.id}/`}>{location.name}</a>
              </td>
              <td>{location.description}</td>
              <td>
                {location.location.latitude}, {location.location.longitude}
              </td>
            </tr>
          )}
        </thead>
      </Table>
      <Table>
        <thead>
          <tr>
            <td>Time</td>
            <td>Height</td>
          </tr>
        </thead>
        <tbody>
          {tides?.map((d) => (
            <tr key={d.id}>
              <td>{new Date(d.occurs).toLocaleString()}</td>
              <td>{d.height}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

function createTideDataPage(elementId: string) {
  const div = ReactDOM.createRoot(document.getElementById(elementId)!);
  div.render(<TideLocationDataPage />);
}

// @ts-expect-error: globalThis has no defintion
globalThis.createTideDataPage = createTideDataPage;
