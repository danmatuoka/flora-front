/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server'

import { cookies } from 'next/headers'

import 'dotenv/config'
import { BASE_URL, PATHS } from './_constants';
import { type PaginatedResponse } from '~/types/paginated-response';

interface HistoryResults {
    word: string,
    added: string
}

export async function getHistory(limit = '5') {
    const cookieStore = await cookies()

    const jwt = cookieStore.get('token')?.value;

    const historyResponse: PaginatedResponse<HistoryResults> = await fetch(`${BASE_URL}/${PATHS.history}?limit=${limit}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })
        .then(res => res.json())
        .catch(error => {
            console.error('Erro:', error);
        });

    return historyResponse
}
