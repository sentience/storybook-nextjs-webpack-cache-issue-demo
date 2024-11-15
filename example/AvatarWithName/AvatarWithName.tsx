import * as React from "react"

type AvatarWithNameProps = {
  fullName: string
  isCurrentUser?: boolean
  nameStyling?: string
}

const AvatarWithName = ({ fullName, isCurrentUser }: AvatarWithNameProps) => (
  <span className="inline-block relative ps-[28px] items-center gap-8">
    {isCurrentUser ? "You" : fullName}
  </span>
)

export default AvatarWithName
