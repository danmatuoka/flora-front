
import Link from "next/link"
import { cookies } from "next/headers"
import { ButtonLogout } from "./button-logout"

export default async function Header() {

  const cookieStore = await cookies()

  const hasToken = cookieStore.get('token')?.value

  const nav = [
    {
      path: '/home',
      name: 'Home'
    },
    {
      path: '/all-words?limit=20&page=1',
      name: 'Words'
    },
    {
      path: '/favorites?limit=20&page=1',
      name: 'Favorites'
    },
  ]

  if (hasToken) return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 border-b-2 shadow sticky top-0">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">

        <p className="underline">Dictionary API</p>

        <div className="ml-auto flex gap-2">
          {
            nav.map(item =>
              <Link
                href={item.path}
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
                key={item.name}
              >
                {item.name}
              </Link>)
          }
        </div>
        <ButtonLogout />
      </header>
    </div>
  )
}