"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FormControl } from "./form";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { sv } from "date-fns/locale";

const PopoverComp = {
  Wrapper: Popover,
  Content: PopoverContent,
  Header: "div",
  Title: "h3",
  Description: "p",
  Trigger: PopoverTrigger,
};

const DrawerComp = {
  Wrapper: Drawer,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Trigger: DrawerTrigger,
};

export function DatePicker({field, title, description, placeholder, arrivalDate}: {
  field: {
  value: Date,
  onChange: (value: Date | undefined) => void;
}, 
title: string, 
description: string, 
placeholder?: string,
arrivalDate?: Date
}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const Comp = PopoverComp;
  const calendarMonthToShow = isDesktop ? 2 : 1;

  const disabledDates = () => {
    if (arrivalDate) {
      return new Date(arrivalDate)
    }
    
    return new Date();
  }

  return (
    <Comp.Wrapper open={open} onOpenChange={setOpen}>
      <Comp.Trigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
                        format(field.value, "LLLL d, yyyy")
                      ) : (
                        <span>{placeholder}</span>
                      )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </Comp.Trigger>
      <Comp.Content className={cn("w-auto p-0")}>
        <Comp.Header className="text-left p-4 pb-2">
          <Comp.Title>{title}</Comp.Title>
          <Comp.Description>{description}</Comp.Description>
        </Comp.Header>
        <Calendar
          locale={sv}
          mode="single"
          numberOfMonths={calendarMonthToShow}
          defaultMonth={field.value}
          selected={field.value}
          onSelect={field.onChange}
          disabled={{ before: disabledDates() }}
          initialFocus
        />
      </Comp.Content>
    </Comp.Wrapper>
  );
}
