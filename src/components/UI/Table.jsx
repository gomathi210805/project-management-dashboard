const Table = ({
  columns,
  data,
  onRowClick,
  isLoading = false,
  emptyMessage = 'No data found',
  className = '',
  headerClassName = '',
  rowClassName = '',
  striped = false,
  hoverable = true,
  pagination,
  ...props
}) => {
  return (
    <div className="glass-dark rounded-2xl overflow-hidden golden-border">
      <div className="overflow-x-auto">
        <table className={`w-full ${className}`} {...props}>
          <thead>
            <tr className="border-b border-slate-700">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`py-4 px-6 text-left text-gold-200 font-semibold ${headerClassName}`}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              // Loading Skeleton
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-b border-slate-700/50">
                  {columns.map((_, colIndex) => (
                    <td key={colIndex} className="py-4 px-6">
                      <div className="h-4 bg-slate-700/50 rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={columns.length} className="py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-gold-500/20 to-gold-600/20 flex items-center justify-center mb-4">
                      <i className="fas fa-inbox text-gold-300 text-xl"></i>
                    </div>
                    <p className="text-slate-400">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              // Data Rows
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`
                    border-b border-slate-700/50 transition-colors
                    ${striped && rowIndex % 2 === 0 ? 'bg-slate-800/30' : ''}
                    ${hoverable ? 'hover:bg-slate-800/50' : ''}
                    ${onRowClick ? 'cursor-pointer' : ''}
                    ${rowClassName}
                  `}
                >
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="py-4 px-6">
                      {column.render ? column.render(row[column.accessor], row) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && data.length > 0 && (
        <div className="p-4 border-t border-slate-700 flex items-center justify-between">
          <div className="text-sm text-slate-400">
            Showing {pagination.pageSize * (pagination.currentPage - 1) + 1} to{' '}
            {Math.min(pagination.pageSize * pagination.currentPage, pagination.totalItems)} of{' '}
            {pagination.totalItems} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={pagination.onPrevious}
              disabled={pagination.currentPage === 1}
              className="p-2 rounded-lg glass-light hover:bg-gold-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <i className="fas fa-chevron-left text-gold-300"></i>
            </button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.ceil(pagination.totalItems / pagination.pageSize) })
                .slice(0, 5)
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() => pagination.onPageChange(index + 1)}
                    className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                      pagination.currentPage === index + 1
                        ? 'bg-linear-to-r from-gold-500 to-gold-600 text-slate-900'
                        : 'glass-light text-slate-300 hover:text-gold-300 hover:bg-gold-500/10'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
            <button
              onClick={pagination.onNext}
              disabled={pagination.currentPage === Math.ceil(pagination.totalItems / pagination.pageSize)}
              className="p-2 rounded-lg glass-light hover:bg-gold-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <i className="fas fa-chevron-right text-gold-300"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Table