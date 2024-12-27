/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server'

import { cookies } from 'next/headers'

import 'dotenv/config'
import { BASE_URL, PATHS } from './_constants';
import { type PaginatedResponse } from '~/types/paginated-response';


export async function getAllWords(limit = '5', page = '1') {

  if (page === '0') {
    return;
  }
  const cookieStore = await cookies()

  const jwt = cookieStore.get('token')?.value;

  const wordsResponse: PaginatedResponse<string> = await fetch(`${BASE_URL}/${PATHS.getWord}?limit=${limit}&page=${page}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then(res => res.json())
    .catch(error => {
      console.error('Erro:', error);
    });

  return wordsResponse
}
