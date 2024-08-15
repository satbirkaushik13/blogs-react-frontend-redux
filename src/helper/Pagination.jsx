import React from 'react';
import { useTranslation } from 'react-i18next';

const Pagination = ({ page, totalPages, goToPage }) => {
    const { t } = useTranslation();
    const previousPage = Math.max(page - 1, 1);
    const nextPage = Math.min(page + 1, totalPages);

    const elements = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i > 3) { break; }
        elements.push(
            <li
                key={i}
                className={`page-item ${page === i ? 'active' : ''}`}
            >
                <span
                    className="page-link"
                    onClick={() => goToPage(i)}
                >
                    {i}
                </span>
            </li>
        );
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <span
                        className="page-link"
                        onClick={() => page > 1 && goToPage(1)}
                        role="button"
                    >
                        {t("First")}
                    </span>
                </li>
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <span
                        className="page-link"
                        onClick={() => page > 1 && goToPage(previousPage)}
                        role="button"
                    >
                        {t("Previous")}
                    </span>
                </li>
                {elements}
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                    <span
                        className="page-link"
                        onClick={() => page < totalPages && goToPage(nextPage)}
                        role="button"
                    >
                        {t("Next")}
                    </span>
                </li>
                <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                    <span
                        className="page-link"
                        onClick={() => page < totalPages && goToPage(totalPages)}
                        role="button"
                    >
                        {t("Last")}
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
