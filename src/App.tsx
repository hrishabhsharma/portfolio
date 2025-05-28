import './App.css'
import ThemeToggle from './components/ThemeToggle'
import ToDo from './components/ToDo'
import { ThemeProvider } from './context/ThemeProvider'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-200 ease-in-out">
        <ThemeToggle />
        <ToDo />
      </div>
    </ThemeProvider>
  )
}

export default App
