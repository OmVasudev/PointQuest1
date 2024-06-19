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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(1, "Club Name is required").max(30),
  description: z.string().min(1, "Description is required").max(50),
  president: z.string().min(1, "President Name is required").max(30),
  faculty: z.string().min(1, "Faculty Name is required").max(30),
  techLead: z.string().min(1, "TechLead Name is required").max(30),
  image: z.string(),
});

const AddClub = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("api/club", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        president: values.president,
        faculty: values.faculty,
        techLead: values.techLead,
        image: values.image,
      }),
    });

    if (response.ok) {
      router.push("/viewClub");
    } else {
      toast({
        title: "Error",
        description: "Opps! something went wrong",
        variant: "destructive",
      });
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
            name="techLead"
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="Enter image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
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
          /> */}
        </div>

        <Button className="w-full mt-6" type="submit">
          Create Club
        </Button>
      </form>
    </Form>
  );
};

export default AddClub;
