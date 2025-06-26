"use client";

import { createTrip } from "@/lib/actions/create-trip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UploadButton } from "@/lib/upload-thing";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useTransition } from "react";

export default function NewTrip() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={(formData: FormData) => {
              if (imageUrl) {
                formData.append("imageUrl", imageUrl);
              }
              startTransition(() => {
                createTrip(formData);
              });
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Kathmandu trip..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="We plan travel to ..."
                className={cn(
                  "w-full border border-gray-300 px-3 py-2",
                  "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 ">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  className={cn(
                    "w-full border border-gray-300 px-3 py-2",
                    "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                  required
                />
              </div>
            </div>
            <div>
              <label>Trip Image</label>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="trip preview"
                  className="w-1/3 container mx-auto mb-4 rounded object-cover"
                  width={300}
                  height={100}
                />
              )}
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error) => {
                  console.error("Upload error: ", error);
                }}
              />
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Creating..." : "Create Trip"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
