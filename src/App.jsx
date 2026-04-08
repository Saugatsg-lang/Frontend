import { AppProvider } from './context/AppContext'
import SmartShop from './SmartShop'

function App() {
  return (
    <AppProvider>
      <SmartShop />
    </AppProvider>
  )
}

export default App