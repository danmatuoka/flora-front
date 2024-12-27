/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Button } from "./ui/button"
import { bookmark } from "~/app/actions/bookmark"

type ButtonUnmarkProps = {
  word: string;
  limit: string;
}

export const ButtonUnmark = ({ word, limit }: ButtonUnmarkProps) => {
  const handleUnmark = async () => {
    await bookmark(word, 'DELETE')
  }
  return (
    <Button onClick={handleUnmark} size={'sm'}>Unmark!</Button>
  )
}