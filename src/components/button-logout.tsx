'use client'

import { logout } from "~/app/actions/logout"
import { Button } from "./ui/button"

type ButtonLogout = {
  clickAction: () => void
}

export const ButtonLogout = () => {
  const handleLogout = async () => {
    await logout()
  }
  return (
    <Button onClick={() => handleLogout()} variant={"outline"}>Logout</Button>
  )
}