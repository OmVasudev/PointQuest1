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

const FormSchema = z
  .object({
    clubname: z.string().min(1, "Club Name is required").max(30),
    description: z.string().min(1, "Description is required").max(50),
    president: z.string().min(1, "President Name is required").max(30),
    faculty: z.string().min(1, "Faculty Name is required").max(30),
    techlead: z.string().min(1, "TechLead Name is required").max(30),
    clubimage:z.string(), // ADD CLUB IMAGE VALIDATION
  })


const AddClub = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="clubname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Club Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Club Name" {...field} />
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
            name="president"
            render={({ field }) => (
              <FormItem>
                <FormLabel>President</FormLabel>
                <FormControl>
                  <Input placeholder="Enter President name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="faculty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculty Co-ordinator</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="techlead"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technical Lead</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="clubimage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <div style={{ marginTop: "10px" }}>
                    <input
                      type="file"
                      accept="image/*" // Optionally restrict to image files
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full mt-6" type="submit">
          Create Club
        </Button>
      </form>
    </Form>
  );
};

export default AddClub;
