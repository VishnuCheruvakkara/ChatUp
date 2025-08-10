import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      {/* Prev button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center font-semibold transition
          ${currentPage === 1 ? "text-gray-400 border-gray-400 cursor-not-allowed" : "text-primary hover:bg-accent hover:text-white"}
        `}
        aria-label="Previous page"
      >
        <FiChevronLeft size={20} />
      </button>

      {/* Page numbers */}
      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`w-10 h-10 rounded-full border-2 border-primary font-semibold transition
            ${num === currentPage ? "bg-accent text-white" : "text-primary hover:bg-accent hover:text-white"}
          `}
        >
          {num}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center font-semibold transition
          ${currentPage === totalPages ? "text-gray-400 border-gray-400 cursor-not-allowed" : "text-primary hover:bg-accent hover:text-white"}
        `}
        aria-label="Next page"
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
