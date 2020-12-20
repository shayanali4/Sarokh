import React from 'react';
import { useState, useEffect } from 'react';
import {
	useTable,
	usePagination,
	useGlobalFilter,
	useSortBy,
	useRowSelect,
} from 'react-table';
import GlobalFilter from './globalfilter';
import Pagination from './pagination';

const IndeterminateCheckbox = React.forwardRef(
	/* this is the component for select row functionality */

	({ indeterminate, ...rest }, ref) => {
		const defaultRef = React.useRef();
		const resolvedRef = ref || defaultRef;

		React.useEffect(() => {
			resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		return (
			<>
				<input type="checkbox" ref={resolvedRef} {...rest} />
			</>
		);
	}
);

function GenericTable({
	columns,
	data,
	filter,
	pagination,
	form,
	style,
	hiddenColumns = [],
	updateMyData,
	skipPageReset,
	editablecolumn,
	pagesize = 6,
	tableclass = '',
	rowToggle = false, // incase of select row option
	selectedData, // setState function from the parent component to set the selected rows from the table in array in parent compoenent state
	dataCheck, // state from the parent function that provides the existing state of selected values, it is empty array initially because no rows are selected
}) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		rows,
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
		selectedFlatRows,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageIndex: 0,
				pageSize: pagesize,
				hiddenColumns: hiddenColumns,
			},
			autoResetPage: !skipPageReset,
			updateMyData,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		(hooks) => {
			if (rowToggle) {
				hooks.visibleColumns.push((columns) => [
					// Let's make a column for selection
					{
						id: 'selection',
						// The header can use the table's getToggleAllRowsSelectedProps method
						// to render a checkbox
						Header: ({ getToggleAllRowsSelectedProps }) => (
							<div>
								Select All &nbsp;
								<IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
							</div>
						),
						// The cell can use the individual row's getToggleRowSelectedProps method
						// to the render a checkbox
						Cell: ({ row }) => (
							<div>
								<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
							</div>
						),
					},
					...columns,
				]);
			}
		}
	);

	useEffect(() => {
		/* logic to set the selected rows in the table and setstate in the parent component */
		if (rowToggle) {
			/*		if (
				(selectedFlatRows.length !== 0 && dataCheck.length === 0) ||
				(selectedFlatRows.length === 0 && dataCheck.length !== 0)
			) {
				selectedData(selectedFlatRows);
			} else if (dataCheck.length !== 0) {
				if (
					// dataCheck[dataCheck.length - 1].index !==
					// selectedFlatRows[selectedFlatRows.length - 1].index
					dataCheck.length !== selectedFlatRows.length
				) {
					selectedData(selectedFlatRows);
				}
			} 							*/

			if (dataCheck.length !== selectedFlatRows.length) {
				selectedData(selectedFlatRows);
			}
		}
	}, [selectedFlatRows]);

	const count = preGlobalFilteredRows.length;
	return (
		<>
			{filter === true ? (
				<GlobalFilter
					preGlobalFilteredRows={preGlobalFilteredRows}
					setGlobalFilter={setGlobalFilter}
					state={state}
				/>
			) : null}
			{/* //table section */}

			<div className={tableclass} style={null}>
				<table {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										style={column.style}
										{...column.getHeaderProps(column.getSortByToggleProps())}
									>
										{column.render('Header')}
										<span>
											{column.isSorted ? (
												column.isSortedDesc ? (
													<>
														&nbsp;
														<i className="fa fa-arrow-down" />
													</>
												) : (
													<>
														&nbsp;
														<i className="fa fa-arrow-up" />
													</>
												)
											) : (
												''
											)}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<tr key={123} {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return (
											<td {...cell.getCellProps()} onClick={() => {}}>
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{/* //pagination section */}

			{pagination === true ? (
				<Pagination
					pageOptions={pageOptions}
					pageIndex={pageIndex}
					canPreviousPage={canPreviousPage}
					canNextPage={canNextPage}
					previousPage={previousPage}
					nextPage={nextPage}
					pageSize={pageSize}
					state={state}
					setPageSize={setPageSize}
				/>
			) : null}
		</>
	);
}

export default GenericTable;
