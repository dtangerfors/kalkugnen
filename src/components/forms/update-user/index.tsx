"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Family } from "@prisma/client";
import { Button } from "@/components/ui/button-primary";
import { updateUserData } from "./action";

export const formSchema = z.object({
  user_id: z.string(),
  user_role: z.enum(["user", "admin", "super_admin", "moderator"]),
  family_id: z.string().optional(),
});

export const roles = [
  { key: "super_admin", label: "Super Admin" },
  { key: "admin", label: "Admin" },
  { key: "moderator", label: "Moderator" },
  { key: "user", label: "User" },
];

export function UpdateUserForm({
  values,
  families,
}: {
  values?: Partial<z.infer<typeof formSchema>>;
  families: Family[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: values?.user_id || "",
      user_role: values?.user_role || "user",
      family_id: values?.family_id || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUserData(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem hidden>
              <FormLabel>Användarid</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user_role"
          render={({ field }) => (
            <FormItem className="flex gap-4 items-center justify-between space-y-0">
              <FormLabel>Användarroll</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-56">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {roles.map((item) => (
                    <SelectItem key={`role-${item.key}`} value={item.key}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="family_id"
          render={({ field }) => (
            <FormItem className="flex gap-4 items-center justify-between space-y-0">
              <FormLabel>Familj</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Välj familj"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {families.map((item) => (
                    <SelectItem key={`role-${item.id}`} value={item.id}>
                      {item.family_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="primary">Spara</Button>
      </form>
    </Form>
  );
}
