"use client";

import { useEffect, useState } from "react";
import { getAllCars } from "@/lib/actions/car.actions";
import type { Car } from "@/lib/generated/prisma";

export { AddCarDialog } from "./add-car-dialog";

export const CarsList = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getAllCars();
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div>Loading cars...</div>;

  return (
    <div className="grid gap-4">
      {cars.map((car) => (
        <div key={car.id} className="p-4 border rounded-lg">
          <h3 className="font-semibold">
            {car.brand.name} {car.model.name}
          </h3>
          <p>Year: {car.year}</p>
          <p>Color: {car.color}</p>
          <p>Price: €{car.price.toLocaleString()}</p>
          <p>Mileage: {car.mileage.toLocaleString()} km</p>
        </div>
      ))}
    </div>
  );
};
