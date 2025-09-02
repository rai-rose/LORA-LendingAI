import Button from "@/components/ui/button/Button"; // Adjust import based on your setup

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  onPageChange,
}) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(indexOfFirstItem + itemsPerPage, totalItems);

  // Generate page numbers to display (current page ± 1, with ellipsis)
  const pagesAroundCurrent = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => i + Math.max(currentPage - 1, 1)
  ).filter((page) => page <= totalPages);

  return (
    <div className="mt-6 flex items-center justify-between">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {totalItems} items
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          Previous
        </Button>
        {currentPage > 3 && <span className="px-2 text-gray-500 dark:text-gray-400">...</span>}
        {pagesAroundCurrent.map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={currentPage === page ? "primary" : "outline"}
            className={
              currentPage === page
                ? "rounded-lg bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
                : "rounded-lg border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
            }
          >
            {page}
          </Button>
        ))}
        {currentPage < totalPages - 2 && (
          <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
        )}
        <Button
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;