import React, { useState, useEffect } from "react"
import BreweryCount from "./BreweryCount"
import axios from "axios"

const Breweries = () => {
	const [breweries, setBreweries] = useState([])
	const [searchInput, setSearchInput] = useState("")
	const [filterState, setFilterState] = useState("allData")
	const apiUrl = "https://api.openbrewerydb.org/breweries"

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(apiUrl)
				setBreweries(response.data)
			} catch (error) {
				console.error("there was an error fetching breweries:", error)
			}
		}

		fetchData()
	}, [])

	const handleInputChange = e => {
		setSearchInput(e.target.value)
	}

	const filteredBreweries = breweries.filter(brewery => {
		if (filterState === "california") {
			return (
				brewery.state.toLowerCase() === "california" &&
				brewery.name.toLowerCase().includes(searchInput.toLowerCase())
			)
		}
		if (filterState === "texas") {
			return (
				brewery.state.toLowerCase() === "texas" &&
				brewery.name.toLowerCase().includes(searchInput.toLowerCase())
			)
		}
		if (filterState === "oregon") {
			return (
				brewery.state.toLowerCase() === "oregon" &&
				brewery.name.toLowerCase().includes(searchInput.toLowerCase())
			)
		} else {
			return brewery.name.toLowerCase().includes(searchInput.toLowerCase())
		}
	})

	// Filtering by State buttons
	const filterCali = () => {
		setFilterState("california")
	}

	const filterTexas = () => {
		setFilterState("texas")
	}

	const filterOregon = () => {
		setFilterState("oregon")
	}

	const filterAll = () => {
		setFilterState("allData")
	}

	return (
		<div>
			<h2 className="header">List of Breweries</h2>
      <BreweryCount totalBreweries={filteredBreweries.length}/>
			<div className="search-bar">
				{/* Search bar */}
				<input
					type="text"
					placeholder="Search..."
					value={searchInput}
					onChange={handleInputChange}
				/>
			</div>
			<div className="filter-container">
				<button onClick={filterCali} className="filter-button">
					Filter for Breweries in California
				</button>
				<button onClick={filterTexas} className="filter-button">
					Filter for Breweries in Texas
				</button>
				<button onClick={filterOregon} className="filter-button">
					Filter for Breweries in Oregon
				</button>
				<button onClick={filterAll} className="filter-button">
					Show all Breweries
				</button>
			</div>

			<ul>
				{filteredBreweries.map(brewery => (
					<li key={brewery.id}>
						{brewery.name}: {brewery.city}, {brewery.state}
					</li>
				))}
			</ul>
  
		</div>
	)
}

export default Breweries
