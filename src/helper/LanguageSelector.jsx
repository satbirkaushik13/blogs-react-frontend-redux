import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
    { code: "en", lang: "English" },
    { code: "hi", lang: "Hindi" },
    { code: "ar", lang: "Arabic" },
    { code: "fr", lang: "French" },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };
    useEffect(() => {
        document.body.dir = i18n.dir()
    },[i18n, i18n.language])
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