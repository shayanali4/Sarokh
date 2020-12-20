import React from 'react';


function Pagination(
    {
        pageOptions,
        pageIndex,
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage,
        pageSize,
        state,
        setPageSize

    }
) {
    return (

        <div className="pagination">
            <span className="page-num">
                Page{' '}
                <strong>
                    {pageOptions.length === 0 ? "1 of 1" : (<>{pageIndex + 1} of {pageOptions.length}</>)}
                </strong>{' '}
            </span>
            <button className="btn btn-info" onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
            </button>{" "}&nbsp;
            <button className="btn btn-info" onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </button>{" "}
            <select className="btn btn-info page-item"
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value));
                }}
            >
                {[6, 10, 15, 20].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
    );

}

export default Pagination;