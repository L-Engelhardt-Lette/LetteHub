import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";

interface AvatarProps {
  loggedIn: boolean;
  userInitials?: string; // Initials for the logged-in state
  profileImageUrl?: string; // Image URL for the logged-in state
}

function UserAvatar({ loggedIn, userInitials, profileImageUrl }: AvatarProps) {
  // State to manage the image URL or initials to display
  const [displayedContent, setDisplayedContent] = useState<string | undefined>(
    undefined
  );

  // Determine what to show based on the props and state
  React.useEffect(() => {
    if (loggedIn) {
      if (profileImageUrl) {
        setDisplayedContent(profileImageUrl);
      } else if (userInitials) {
        setDisplayedContent(userInitials);
      }
    } else {
      setDisplayedContent(undefined); // Reset to default (no content)
    }
  }, [loggedIn, profileImageUrl, userInitials]);

  return (
    <Avatar src={displayedContent}>
      {!displayedContent && !loggedIn && "U"}{" "}
      {/* Default "U" when not logged in */}
    </Avatar>
  );
}

export default UserAvatar;
