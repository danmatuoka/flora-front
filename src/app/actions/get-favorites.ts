/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server'

import { cookies } from 'next/headers'

import 'dotenv/config'
import { BASE_URL, PATHS } from './_constants';
import { type PaginatedResponse } from '~/types/paginated-response';

interface FavoritesResults {
    word: string,
    added: string
}

export async function getFavorites(limit = '100') {
    const cookieStore = await cookies()

    const jwt = cookieStore.get('token')?.value;

    const favoriteResponse: PaginatedResponse<FavoritesResults> = await fetch(`${BASE_URL}/${PATHS.favorites}?limit=${limit}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })
        .then(res => res.json())
        .catch(error => {
            console.error('Erro:', error);
        });

    return favoriteResponse
}
