/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use server'

import { redirect } from "next/navigation";

import { cookies } from 'next/headers'
import { SignupFormSchema } from "../../lib/SignupFormSchema";
import { LoginFormSchema } from "../../lib/LoginFormSchema";
import 'dotenv/config'
import { BASE_URL, PATHS } from "./_constants";

export async function signup(state, formData: FormData) {
  const cookieStore = await cookies()
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const res = await fetch(`${BASE_URL}/${PATHS.signup}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(validatedFields.data)
  })
    .then(res => res.json())
    .catch(error => {
      console.error('Erro:', error);
    });

  if (res.token) {
    cookieStore.set('token', res.token)
    redirect('/home')
  }

}

export async function login(state, formData: FormData) {
  const cookieStore = await cookies()
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }


  const res = await fetch(`${BASE_URL}/${PATHS.signin}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(validatedFields.data)
  })
    .then(res => res.json())
    .catch(error => {
      console.error('Erro:', error);
    });

  if (res.token) {
    cookieStore.set('token', res.token)
    redirect('/home')
  }
}