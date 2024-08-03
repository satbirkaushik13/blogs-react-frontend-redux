import React from 'react'

const Pagination = ({ page, totalPages, goToPage }) => {
    const previousPage = Math.max(page - 1, 1);
    
    const elements = [];
    for (let i = 1; i <= totalPages; i++) {
        elements.push(<li className={`page-item ${page === i && 'active'}`}><span className="page-link" onClick={goToPage(i)}>{i}</span></li>);
        if (3 == i) {
            break;
        }
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${1 == page && 'disabled'}`}>
                    <span className="page-link" onClick={goToPage(1)}>First</span>
                </li>
                <li className={`page-item ${1 == page && 'disabled'}`}>
                    <span className="page-link" onClick={goToPage(previousPage)}>Previous</span>
                </li>
                {elements}
                <li className={`page-item ${totalPages == page && 'disabled'}`}>
                    <span className="page-link" onClick={page + 1}>Next</span>
                </li>
                <li className={`page-item ${1 == page && 'disabled'}`}>
                    <span className="page-link" onClick={goToPage(totalPages)}>Last</span>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination