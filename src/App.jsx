import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import { ThemeProvider } from "./ThemeContext"

export default function App(){
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  )
}