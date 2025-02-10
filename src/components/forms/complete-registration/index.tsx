"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CompleteRegistrationFormValues } from "@/lib/types";
import { createUser } from "@/lib/actions";

interface Claims {
  [key: string]: any;
}

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button-primary";

const FormSchema = z.object({
  given_name: z.string().min(2, {
    message: "Vänligen ange ditt förnamn.",
  }),
  family_name: z.string().min(2, {
    message: "Vänligen ange ditt förnamn.",
  }),
  uuid: z.string(),
  email: z.string(),
})

export function CompleteRegistration({user}: {user: Claims}) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      given_name: user.given_name as string || "",
      family_name: user.family_name as string || "",
      uuid: user.app_user_id as string,
      email: user.email as string,
    },
  })

  const onSubmit = (values: CompleteRegistrationFormValues) => {
    const data = JSON.parse(JSON.stringify(values))
    createUser(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="given_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Förnamn</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="family_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Efternamn</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="primary" type="submit">Fortsätt</Button>
      </form>
    </Form>
  )
}