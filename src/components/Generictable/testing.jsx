import React from 'react';
import {useTable, usePagination, useGlobalFilter} from 'react-table';
import matchSorter from 'match-sorter';

function SimpleTable(props) {

    var paginationDisplay = {display: ''};

    const data = React.useMemo(
        () => [
            {
                col1: 'john doe',
                col2: "world",
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
        ],
        [],
    );

    const columns = React.useMemo(
        () => [
            {
                Header: 'STUDENT NAME',
                accessor: 'col1', // accessor is the "key" in the data
                Cell: (row) => {
                    return (
                        <>
                            {row.row.original.col1}
                            <p>FA16-BCS-067</p>
                        </>);
                },

            },
            {
                Header: 'ATTENDANCE',
                accessor: 'col2',// use accessor name in hidden column to hide a column e.g intitalstate.hiddenColumns['col2']
            },
            {
                Header: 'QUIZEZ',
                accessor: '',

            },
            {
                Header: 'ASSIGNMENT',
                accessor: '',
            },
            {
                Header: 'FIRST TERM',
                accessor: '',
            },
            {
                Header: 'MID TERM',
                accessor: '',
            },
            {
                Header: 'FINAL TERM',
                accessor: '',
            },
            {
                Header: 'action',
                accessor: '',
                Cell: (row) => {
                    return (
                        <button className="btn btn-danger"
                                onClick={() => console.log(row.row)}
                        >
                            View
                        </button>);
                },
            },
        ],
        [],
    );

    function GlobalFilter({
                              preGlobalFilteredRows,
                              globalFilter,
                              setGlobalFilter,
                          }) {
        const count = preGlobalFilteredRows.length

        return (
            <span>
        Search:{' '}
                <input
                    value={globalFilter || ''}
                    onChange={e => {
                        setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                    }}
                    placeholder={`${count} records...`}
                    style={{
                        fontSize: '1.1rem',
                        border: '0',
                    }}
                />
      </span>
        )
    }


    function fuzzyTextFilterFn(rows, id, filterValue) {
        return matchSorter(rows, filterValue, {keys: [row => row.values[id]]})
    }

    // Our table component
    function Table({columns, data}) {
        const filterTypes = React.useMemo(
            () => ({
                // Add a new fuzzyTextFilterFn filter type.
                fuzzyText: fuzzyTextFilterFn,
                // Or, override the default text filter to use
                // "startWith"
                text: (rows, id, filterValue) => {
                    return rows.filter(row => {
                        const rowValue = row.values[id]
                        return rowValue !== undefined
                            ? String(rowValue)
                                .toLowerCase()
                                .startsWith(String(filterValue).toLowerCase())
                            : true
                    })
                },
            }),
            []
        );

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            page,
            prepareRow,
            canPreviousPage,
            canNextPage,
            nextPage,
            previousPage,
            setPageSize,
            pageOptions,
            state,
            preGlobalFilteredRows,
            setGlobalFilter,
            state: {pageIndex, pageSize}

        } = useTable({columns, data, initialState: {pageIndex: 0, pageSize: 5, hiddenColumns: ['']}},
            useGlobalFilter, usePagination);

        const count = preGlobalFilteredRows.length;
        return (
            <>
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />

                {/* //table section */}

                <div className="row">
                    <div className="col table-div-1 highlight table-2" style={{'overflowY': 'auto', 'height': '455px'}}>
                        <table {...getTableProps()}>
                            <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th
                                            {...column.getHeaderProps()}
                                        >
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row);
                                return (
                                    <tr key={123} {...row.getRowProps()} >
                                        {row.cells.map(cell => {
                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    onClick={() => console.log()}
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* //pagination section */}

                {props === props ? <>
                    <div className="row pagination" style={paginationDisplay}>
            <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
            </span>
                        <button className="btn btn-danger" onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </button>
                        {" "}
                        <button className="btn btn-danger" onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </button>
                        {" "}
                        <select className="btn btn-danger"
                                value={pageSize}
                                onChange={e => {
                                    setPageSize(Number(e.target.value));
                                    console.log(pageSize);
                                }}
                        >
                            {[5, 10, 20, 30].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </> : null}
            </>
        );
    }

    return (
        <Table columns={columns} data={data}/>
    )
}

export default SimpleTable;