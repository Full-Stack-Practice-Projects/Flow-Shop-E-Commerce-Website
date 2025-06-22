// We want later to wrap it with react cache beacuse we will call this function in different server component, we want to fetch data once in same requests.

import { WixClient } from "@/lib/wix-client.base";
import { members } from "@wix/members";
import { cache } from "react";

export const getLoggedInMemebers = cache(
  async (wixClient: WixClient): Promise<members.Member | null> => {
    if (!wixClient.auth.loggedIn()) {
      return null;
    }

    const memberData = await wixClient.members.getCurrentMember({
      // fetch all user data and just subset of it
      fieldsets: [members.Set.FULL],
    });

    return memberData.member || null;
  },
);
