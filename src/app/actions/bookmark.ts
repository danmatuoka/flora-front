/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server'

import { cookies } from 'next/headers'

import 'dotenv/config'
import { BASE_URL } from './_constants';
import { revalidatePath } from 'next/cache';

export async function bookmark(word: string, method: 'POST' | 'DELETE') {
    const cookieStore = await cookies()

    const jwt = cookieStore.get('token')?.value;

    const isBookmark = method === 'POST' ? 'favorite' : 'unfavorite'

    const favoriteResponse = await fetch(`${BASE_URL}/entries/en/${word}/${isBookmark}`, {
        method,
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })
        .then(res => {
            revalidatePath('/favorites')
            return res.json()
        })
        .catch(error => {
            console.error('Erro:', error);
        });

    return favoriteResponse
}
