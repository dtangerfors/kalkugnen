'use client';
import { useEffect, useState } from 'react';
import { setCookie, getCookie } from 'cookies-next';
import {
  checkPermissionStateAndAct,
  notificationUnsupported,
  registerAndSubscribe
} from '@/app/Push';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const COOKIE_NAME = 'allowNotifications';

export default function NotificationDialog() {
  const [unsupported, setUnsupported] = useState<boolean>(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const isUnsupported = notificationUnsupported();
    setUnsupported(isUnsupported);
    if (isUnsupported) {
      return;
    }
    checkPermissionStateAndAct(setSubscription);
  }, []);

  useEffect(() => {
    const allowNotificationsCookie = getCookie(COOKIE_NAME);
    if (allowNotificationsCookie !== 'dontShow') {
      setDialogOpen(true);
    }
  }, []);

  const doNotShowAgain = () => {
      // Create date 1 year from now
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1);
      setCookie(COOKIE_NAME, 'dontShow', { expires: date }); // Set cookie for a year
  };

  const handleAcceptClick = () => {
    registerAndSubscribe(setSubscription);
    doNotShowAgain();
  }

  return (
  <AlertDialog open={dialogOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Tillåt notifikationer</AlertDialogTitle>
        <AlertDialogDescription>
          Med notifikationer tillåtna kan du få uppdateringar om nya bokningar direkt i din enhet. Du kan uppdatera dina inställningar när som helst.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={doNotShowAgain}>Avbryt</AlertDialogCancel>
        <AlertDialogAction disabled={unsupported} onClick={handleAcceptClick}>Godkänn</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
}