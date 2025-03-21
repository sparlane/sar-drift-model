interface tide_location {
  id: number;
  name: string;
  description?: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface tide_data {
  id: number;
  height: number;
  high: boolean;
  occurs: Date;
}

export { tide_location, tide_data };
