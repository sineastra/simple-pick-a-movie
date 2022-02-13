import { BaseSyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./SearchBar.module.scss"


const SearchBar = () => {
	const [search, setSearch] = useState('')
	const navigate = useNavigate()

	const handleChange = (e: BaseSyntheticEvent) => {
		setSearch(e.target.value)
	}

	const handleSubmit = (e: BaseSyntheticEvent) => {
		e.preventDefault()

		if (search.trim() !== '') {
			navigate({
				pathname: '/search',
				search: `?q=${ search }`,
			})
			setSearch('')
		}
	}

	return (
		<form onSubmit={ handleSubmit } className={ styles.form }>
			<input
				type="search"
				placeholder="Search by movie title..."
				onChange={ handleChange }
				value={ search }
				className={ styles.input }
			/>
			<button>Search</button>
		</form>
	)
}

export default SearchBar