import * as React from "react"
import AvatarWithName from "./AvatarWithName"

export default {
  title: "Avatar With Name",
  parameters: {},
}

export const WithImageProvidedAndIsCurrentUser = () => (
  <AvatarWithName fullName="Jane Doe" isCurrentUser />
)
