"use client";

import { useFieldArray, useForm, useFormState } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "./ui/checkbox";

const REQUIRED_ERROR = "This field is required.";

const employeeSchema = z.object({
 name: z.string().nonempty({ message: REQUIRED_ERROR }),
 country: z.union([z.literal("USA"), z.literal("POL")]).optional(),
 retired: z.boolean(),
});

const formSchema = z.object({
 employees: z.array(employeeSchema),
});

type Employee = z.infer<typeof employeeSchema>;

const useDynamicForm = () => {
 const { data } = useQuery<{ employees: Employee[] }>({
  queryKey: ["employees"],
  queryFn: () => fetch(`/api/employees`).then((res) => res.json()),
 });

 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  values: { employees: data?.employees || [] },
 });

 const { fields } = useFieldArray({
  control: form.control,
  name: "employees",
 });

 const onSubmit = (data: z.infer<typeof formSchema>) => {
  console.log(data);
 };

 return { form, onSubmit, employees: fields };
};

export const DynamicForm = () => {
 const { form, onSubmit, employees } = useDynamicForm();

 return (
  <Form {...form}>
   <form onSubmit={form.handleSubmit(onSubmit)} className="border flex max-w-md m-auto flex-col space-y-2 p-6 mt-10 rounded-lg">
    <h2 className="text-lg">Change employees data</h2>

    {employees.map(({ name }, index) => (
     <div className="flex gap-2 " key={name}>
      <FormField
       control={form.control}
       name={`employees.${index}.name`}
       render={({ field }) => (
        <div className="flex items-start justify-center gap-2">
         <FormItem className="flex-grow">
          {index === 0 && <FormLabel>Name</FormLabel>}
          <FormControl>
           <Input placeholder="Review" {...field} />
          </FormControl>
          <FormMessage className="text-xs" />
         </FormItem>
        </div>
       )}
      />
      <FormField
       control={form.control}
       name={`employees.${index}.country`}
       render={({ field }) => {
        return (
         <FormItem className="flex-grow">
          <Select onValueChange={field.onChange} defaultValue={field.value}>
           {index === 0 && <FormLabel>Country</FormLabel>}

           <FormControl>
            <SelectTrigger>
             <SelectValue placeholder="Select country" />
            </SelectTrigger>
           </FormControl>
           <SelectContent>
            <SelectItem value="USA">🇺🇸 USA</SelectItem>
            <SelectItem value="POL">🇵🇱 POL</SelectItem>
           </SelectContent>
          </Select>

          <FormMessage />
         </FormItem>
        );
       }}
      />

      <FormField
       control={form.control}
       name={`employees.${index}.retired`}
       render={({ field }) => (
        <FormItem className="flex flex-col justify-center items-center ">
         {index === 0 && <FormLabel className="mb-[10px]">R</FormLabel>}

         <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
         </FormControl>
         <div className="space-y-1 leading-none"></div>
        </FormItem>
       )}
      />
     </div>
    ))}
    <Button>Send data</Button>
   </form>
  </Form>
 );
};
