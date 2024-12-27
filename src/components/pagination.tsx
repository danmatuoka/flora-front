import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "./ui/pagination";

type PaginationCustomProps = {
  page: string,
  limit: string,
  totalPages: number,
  hasNext: boolean,
  hasPrev: boolean,
  path: 'allWords' | 'favorites',
}

export function PaginationCustom({ page, limit, totalPages, hasNext, hasPrev, path }: PaginationCustomProps) {

  const paths = {
    allWords: 'all-words',
    favorites: 'favorites'
  }

  const handlePrev = () => {
    return `/${paths[path]}?limit=${limit}&page=${Number(page) - 1}`
  }

  const handleNext = () => {
    return `/${paths[path]}?limit=${limit}&page=${Number(page) + 1}`
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className={!hasPrev ? "opacity-25 pointer-events-none" : undefined} href={handlePrev()} />
        </PaginationItem>
        {Number(page) - 1 > 0 &&
          <PaginationItem>
            <PaginationLink href={handlePrev()}>
              {Number(page) - 1}
            </PaginationLink>
          </PaginationItem>}
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        {Number(page) + 1 < Number(totalPages) &&
          <PaginationItem>
            <PaginationLink href={handleNext()}>
              {Number(page) + 1}
            </PaginationLink>
          </PaginationItem>}
        <PaginationItem>
          <PaginationNext className={!hasNext ? "opacity-25 pointer-events-none" : undefined} href={handleNext()} />
        </PaginationItem>
      </PaginationContent>
    </Pagination >
  )
}
