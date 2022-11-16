
import React from 'react'

const Pagination = ({ lastpage, currentPage, onPageChange }) => {

    const arr = new Array(lastpage).fill(0)
    return (
        <div >
            {
                arr.map((e, page) =>
                    <button key={page} style={{ border: "1px solid blue", width: "30px", height: "30px" }} disabled={(page + 1) === currentPage} onClick={() => onPageChange(page + 1)}>{page + 1}</button>
                )
            }

        </div>
    )
}

export default Pagination