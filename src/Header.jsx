import { useTheme } from "./ThemeContext"
import Logo from "../public/pngegg.png"
export default function Header(){
    const { isDark, toggleTheme } = useTheme();
    
    return (
        <header>
            <img src={Logo} alt="Logo"/>
            <h1>Reci-Pick</h1>
            <button onClick={toggleTheme} className="theme-btn">
                {isDark ? (
                    <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="4"/>
                            <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
                            <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
                            <line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" strokeWidth="2"/>
                            <line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
                            <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" stroke="currentColor" strokeWidth="2"/>
                            <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" stroke="currentColor" strokeWidth="2"/>
                            <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" stroke="currentColor" strokeWidth="2"/>
                            <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Light
                    </>
                ) : (
                    <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                        Dark
                    </>
                )}
            </button>
        </header>
    )
}