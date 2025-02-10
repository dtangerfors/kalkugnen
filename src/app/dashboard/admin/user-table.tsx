
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ExtendedUser } from "@/lib/types";
import { UserDialog } from "./dialog";
import { Family } from "@prisma/client";

export function UserTable({users, families}: {users: ExtendedUser[], families: Family[]}) {
  return (
    <div className="rounded-2xl bg-white p-4 pr-0 pt-0">
    <Table aria-label="Mina bokningar" className="min-w-[640px]">
      <TableHeader className="uppercase">
        <TableRow>
          <TableHead>Namn</TableHead>
          <TableHead>Mail</TableHead>
          <TableHead>Familj</TableHead>
          <TableHead>Rättigheter</TableHead>
          <TableHead>Ändra</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>{`${user.clerkUser.firstName} ${user.clerkUser.lastName}`}</TableCell>
            <TableCell>{user.clerkUser.emailAddresses[0].emailAddress}</TableCell>
            <TableCell>{user.family?.family_name || null}</TableCell>
            <TableCell>{user.user_role}</TableCell>
            <TableCell><UserDialog user={user} families={families} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  )
}