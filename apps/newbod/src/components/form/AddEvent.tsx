"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string().min(1, "Event Name is required").max(30),
  description: z.string().min(1, "Description is required").max(50),
  contact: z.string().min(1, "Contact Details is required").max(30),
  link: z.string().min(1, "Faculty Name is required").max(30),
  points: z.string().min(1, "Activity Points is required").max(30),
  clubId: z.string().min(1, "Club selection is required"),
  viewImage: z.string().min(1, "Event Banner is required").max(30),
  downloadImage: z.string().min(1, "Event Banner is required").max(30),
});

const AddEvent = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get("/api/clubs");
        console.log(response.data); // Log the response data
        setClubs(response.data);
      } catch (error) {
        console.error("Error fetching clubs", error);
      }
    };

    fetchClubs();
  }, []);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const selectedClub = clubs.find((club) => club.id === values.clubId);
    console.log(selectedClub); // Log selected club
    const submissionData = {
      ...values,
    };
    console.log(submissionData); // Log submission data

    try {
      await axios.post("/api/event", submissionData);
      alert("Event created successfully");
      router.push("/view-event");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Event Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clubId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Club</FormLabel>
                <FormControl>
                  <select {...field} className="w-full p-2 border rounded">
                    <option value="">Select a club</option>
                    {clubs.map((club) => (
                      <option key={club.id} value={club.id}>
                        {club.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Details</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Contact Details" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration Link</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Registration link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="points"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Points </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Activity points" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="viewImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Image </FormLabel>
                <FormControl>
                  <Input placeholder="Upload Image " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="downloadImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Image </FormLabel>
                <FormControl>
                  <Input placeholder="Upload Image " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Create Event
        </Button>
      </form>
    </Form>
  );
};

export default AddEvent;
