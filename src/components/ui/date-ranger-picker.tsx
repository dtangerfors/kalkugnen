"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ControllerRenderProps } from "react-hook-form";

const DialogComp = {
  Wrapper: Dialog,
  Content: DialogContent,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Trigger: DialogTrigger,
};

const DrawerComp = {
  Wrapper: Drawer,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Trigger: DrawerTrigger,
};

export function DateRangerPicker({field, title, description}: {field: ControllerRenderProps, title: string, description: string}) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const Comp = isDesktop ? DialogComp : DrawerComp;
  const calendarMonthToShow = isDesktop ? 2 : 1;

  return (
    <Comp.Wrapper open={open} onOpenChange={setOpen}>
      <Comp.Trigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value?.arrival ? (
              field.value.departure ? (
                <>
                  {format(field.value.arrival, "LLL dd, y")} -{" "}
                  {format(field.value.departure, "LLL dd, y")}
                </>
              ) : (
                format(field.value.arrival, "LLL dd, y")
              )
            ) : (
              <span>Välj datum</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </Comp.Trigger>
      <Comp.Content className="w-auto p-0">
      <Comp.Header className="text-left">
          <Comp.Title>{title}</Comp.Title>
          <Comp.Description>{description}</Comp.Description>
        </Comp.Header>
        <Calendar
          mode="range"
          numberOfMonths={calendarMonthToShow}
          defaultMonth={field.value?.arrival}
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </Comp.Content>
    </Comp.Wrapper>
  );
}
