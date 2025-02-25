"use client"

import { cancelBooking } from "@/lib/actions";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function CancelBookingDialog({bookingId}: {bookingId: string}) {
  const router = useRouter();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const cancelBookingWithId = cancelBooking.bind(null, bookingId);
  
    const handleCancelBooking = async () => {
      const {message} = await cancelBookingWithId();
      setDialogOpen(false);
      toast({
        description: message,
      })
      router.back();
    }

  return (
    <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild><Button variant="outline">Avboka resa</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Avboka resa</AlertDialogTitle>
          <AlertDialogDescription>
          Genom att avboka tas bort bokning bort ur systemet. 
          Du kan fortfarande se den på din profil, men den kan inte återupptas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={() => handleCancelBooking()}>Avboka resa</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    
  )
}