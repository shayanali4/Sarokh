import React from 'react';
import { useEffect, useRef } from 'react';

function GlobalFilter({
    preGlobalFilteredRows,
    setGlobalFilter,
    state
}) {
    const count = preGlobalFilteredRows.length;
    // const textInput = useRef(null);

    // useEffect(() => {
    //     textInput.current.focus();
    // }, []);


    return (
        <div className="row" style={{ 'zoom': '94%' }}>
            <div className="col custom-search">
                <div className="Search-field">
                    <h4>Search</h4>
                    <input className="form-control search-field"
                        // ref={textInput}
                        value={state.globalFilter || ""}
                        onChange={e => {
                            setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                        }}
                        placeholder={`  Total ${count} Records..`}
                        style={{
                            fontSize: "1.1rem",
                            border: "1",

                        }}
                    />

                </div>


            </div>

        </div>
    )
}

export default GlobalFilter;