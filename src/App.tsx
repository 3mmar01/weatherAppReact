import { useState, useEffect } from 'react'
import type { CityData } from './types/CityData'
import Cards from './components/Cards'
import Header from './components/Header'
import Input from './components/Input'


function App() {
  const [cities, setCities] = useState<CityData[]>(() => {
    const stored = localStorage.getItem('City')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('City', JSON.stringify(cities))
  }, [cities])

  const addCity = (city: CityData) => {
    setCities(prev => [...prev, city])
  }

  const removeCity = (id: number) => {
    setCities(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className='min-h-screen w-full bg-gray-900'>
      <div className='mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center'>
        <Header />
        <Input onAddCity={addCity} />
        <Cards cities={cities} onRemoveCity={removeCity} />
      </div>
    </div>
  )
}

export default App
