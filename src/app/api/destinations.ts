export type Destination = {
  id: string;
  city: string;
  image: string;
};

export const getDestinations = async (): Promise<Destination[]> => {

  return [
    { id: "1", city: "Paris", image: "/images/paris.jpg" },
    { id: "2", city: "Bali", image: "/images/bali.jpg" },
    { id: "3", city: "Dubai", image: "/images/dubai.jpg" },
    { id: "4", city: "Rome", image: "/images/rome.jpg" },
    { id: "5", city: "India", image: "/images/india.jpg" },
    { id: "6", city: "Switzerland", image: "/images/switzerland.jpg" },
  ];
};
