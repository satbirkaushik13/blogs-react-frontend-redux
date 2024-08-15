import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
    const { i18n, t } = useTranslation();
    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    const languages = [
        { code: "en", lang: "English" },
        { code: "hi", lang: t("Hindi", {language:"hi"}) + "/Hindi" },
        { code: "ar", lang: t("Arabic") + "/Arabic" },
        { code: "fr", lang: t("French") + "/French" },
    ];

    useEffect(() => {
        console.log(i18n.language);
        document.body.dir = i18n.dir()
    }, [i18n, i18n.language])
    return (
        <>
            <select
                value={i18n.language}
                onChange={handleLanguageChange}
                className="form-select d-inline-block"
                style={{ width: "auto" }}>
                {
                    languages.map((lng) => {
                        return (<option key={lng.code} value={lng.code}>{lng.lang}</option>)
                    })
                }
            </select>
        </>
    )
}

export default LanguageSelector