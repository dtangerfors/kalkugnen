import clsx from "clsx";
import { getDeviceType } from "@/lib/server-utils";
import Navigation from "@/components/dashboard/navigation";
import FixedHeader from "@/components/dashboard/fixed-header";
// import { getUserProfileData } from "@/services/profile.service";
// import { getUser } from "@/lib/data";

export default async function Menu() {
  const {isMobile} = await getDeviceType(); 
  // const user = await getUserProfileData();
  // const { user_role } = await getUser(user.app_user_id);

  return (
    <>
      {isMobile && <FixedHeader label="Meny" />}
      <div className={clsx("relative z-10", isMobile && "mt-14 pt-safe-top")}>
        <div className={clsx("relative z-10 flex w-full max-w-screen-sm mx-auto gap-4 p-6 pb-28")}>
          <Navigation role={"admin"} />
        </div>
      </div>
    </>
  )
}