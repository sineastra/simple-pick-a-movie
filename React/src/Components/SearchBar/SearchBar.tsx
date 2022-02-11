import { BaseSyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./SearchBar.module.scss"


const SearchBar = () => {
	const [searchV, setSearchV] = useState('')
	const navigate = useNavigate()

	const handleChange = (e: BaseSyntheticEvent) => {
		setSearchV(e.target.value)
	}

	const handleSubmit = (e: BaseSyntheticEvent) => {
		e.preventDefault()

		if (searchV.trim() !== '') {
			navigate({
				pathname: '/search',
				search: `?q=${ searchV }`,
			})
			setSearchV('')
		}
	}

	return (
		<form onSubmit={ handleSubmit } className={ styles.form }>
			<input
				type="search"
				placeholder="Search by movie title..."
				onChange={ handleChange }
				value={ searchV }
				className={ styles.input }
			/>
			<button>Search</button>
		</form>
	)
}

export default SearchBar