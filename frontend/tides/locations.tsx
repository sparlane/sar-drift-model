import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";

import { Table } from "react-bootstrap";

import { tide_location } from "./types";

const TideLocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<tide_location[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("", {
          headers: {
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setLocations(data.locations);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const timer = setInterval(fetchData, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <td>Port</td>
          <td>Description</td>
          <td>Location</td>
        </tr>
      </thead>
      <tbody>
        {locations?.map((loc) => (
          <tr key={loc.id}>
            <td>
              <a href={`/tides/${loc.id}/`}>{loc.name}</a>
            </td>
            <td>{loc.description}</td>
            <td>
              {loc.location.latitude}, {loc.location.longitude}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

function createTideLocationsPage(elementId: string) {
  const div = ReactDOM.createRoot(document.getElementById(elementId)!);
  div.render(<TideLocationsPage />);
}

// @ts-expect-error: globalThis has no defintion
globalThis.createTideLocationsPage = createTideLocationsPage;
