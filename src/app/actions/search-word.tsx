/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server'

import { cookies } from 'next/headers'
import 'dotenv/config'
import { BASE_URL, PATHS } from './_constants';

export async function searchWord(search: string) {
  const cookieStore = await cookies()

  if (search === '' || !search) {
    return;
  }

  const jwt = cookieStore.get('token')?.value;

  const res = fetch(`${BASE_URL}/${PATHS.getWord}/${search}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    },
  })
    .then(res => res.json())
    .catch(error => {
      console.error('Erro:', error);
    });

  return res
}
