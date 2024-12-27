'use client'

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react";
import Link from "next/link";


const SearchBar = () => {
	const [search, setSearch] = useState<string | null>(null);

	const handleNavigation = () => {
		if (!search) {
			return '/home'
		}

		return `/word/${search}`
	}

	return (
		<div className="flex w-full max-w-lg items-center gap-5">
			<Input className="h-12" onChange={(data) => setSearch(data.target.value)} />
			<Link href={handleNavigation()}>
				<Button type='button'>Search</Button>
			</Link>
		</div>
	)
}

export { SearchBar }
