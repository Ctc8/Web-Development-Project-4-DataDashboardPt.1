import { useState } from 'react'
import Breweries from '../Components/Breweries'
import BreweryCount from "../Components/BreweryCount"
import axios from 'axios'
import './App.css'

const ACCESS_KEY = import.meta.env.ACCESS_KEY

export default function App() {

  return (
    <div>
      <Breweries />
    </div>
  )
}

