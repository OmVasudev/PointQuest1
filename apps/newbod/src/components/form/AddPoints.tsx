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
import { useToast } from "../ui/use-toast";

const FormSchema = z.object({
  clubName: z.string().min(1, "Club name  is required").max(30),
  activityName: z.string().min(1, "Activity Name is required").max(30),
  points: z.string().min(1, "Activity Points is required").max(30),
  USN: z
    .string()
    .min(1, "Usn is required")
    .length(10, "USN must be exactly 10 characters"),
});

const AddPoints = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch("api/add-points", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clubName: values.clubName,
        activityName: values.activityName,
        points: values.points,
        USN: values.USN,
      }),
    });

    if (response.ok) {
      router.push("/view-event");
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
            name="clubName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Club Name </FormLabel>
                <FormControl>
                  <Input placeholder="Enter Club Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Activity Name" {...field} />
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
                <FormLabel>Activity Points</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Activity Points" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="USN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>USN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter USN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full mt-6" type="submit">
          Add points
        </Button>
      </form>
    </Form>
  );
};

export default AddPoints;
