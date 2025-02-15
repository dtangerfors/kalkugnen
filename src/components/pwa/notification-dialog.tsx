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

interface Props {
	onSubscribe: () => void;
	onCancel: () => void;
	onDontAsk: () => void;
}

export default function NotificationDialog(props: Props) {
  const { onSubscribe, onCancel, onDontAsk } = props;


  return (
  <AlertDialog open={true}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Tillåt notifikationer</AlertDialogTitle>
        <AlertDialogDescription>
          Med notifikationer tillåtna kan du få uppdateringar om nya bokningar direkt i din enhet. Du kan uppdatera dina inställningar när som helst.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onDontAsk}>Fråga inte igen</AlertDialogCancel>
        <AlertDialogCancel onClick={onCancel}>Avbryt</AlertDialogCancel>
        <AlertDialogAction onClick={onSubscribe}>Godkänn</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  );
}