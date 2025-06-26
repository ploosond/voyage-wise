"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

export interface TransformedLocation {
  lat: number;
  lng: number;
  name: string;
  country: string;
}

export default function GlobePage() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [locations, setLocations] = useState<TransformedLocation[]>([]);
  const [visitedCountries, setVisistedCountries] = useState<Set<string>>(
    new Set()
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/trips");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Check if data is an array (expected format)
        if (Array.isArray(data)) {
          setLocations(data);
          const countries = new Set<string>(
            data.map((loc: TransformedLocation) => loc.country)
          );
          setVisistedCountries(countries);
        } else {
          console.error("Unexpected data format:", data);
          setLocations([]);
          setVisistedCountries(new Set());
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
        setLocations([]);
        setVisistedCountries(new Set());
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-center text-4xl font-bold mb-12">
            Your Travel Journey
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  See where you've been...
                </h2>
                <div className="h-[600px] w-full relative">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full ">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                  ) : locations.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <p className="text-gray-500 mb-4">No locations found</p>
                        <p className="text-sm text-gray-400">
                          Add some trips to see them on the globe!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Globe
                      ref={globeRef}
                      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                      backgroundColor="rgba(0,0,0,0)"
                      pointColor={() => "#FF5733"}
                      pointLabel="name"
                      pointRadius={0.5}
                      pointAltitude={0.1}
                      pointsMerge={true}
                      width={800}
                      height={600}
                      pointsData={locations}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Countries Visisted</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    </div>
                  ) : visitedCountries.size === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-2">
                        No countries visited yet
                      </p>
                      <p className="text-sm text-gray-400">
                        Start planning your first trip!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 ">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-800">
                          You've visisted
                          <span className="font-bold">
                            {" "}
                            {visitedCountries.size}
                          </span>{" "}
                          {visitedCountries.size === 1
                            ? "country"
                            : "countries"}
                        </p>
                      </div>
                      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                        {Array.from(visitedCountries)
                          .sort()
                          .map((country, key) => (
                            <div
                              key={key}
                              className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                            >
                              <MapPin className="h-4 w-4 text-red-500" />
                              <span className="font-medium">{country}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
