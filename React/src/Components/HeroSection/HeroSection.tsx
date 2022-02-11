import heroImg from "../../assets/hero-section.jpg"
import styles from "./HeroSection.module.scss"
import { Link } from "react-router-dom"


const HeroSection = () => {
	return (
		<section className={ styles.wrapper }>
			<div className={ styles.innerWrapper }>
				<h1>Explore the unknown...</h1>
				<h5>Dive into the world of new experiences with the newest theater releases.
					<br/>
					Click the link below to browse...
				</h5>
				<Link to="/search" className={ styles.btnLink }>Browse</Link>
			</div>
		</section>
	)
}

export default HeroSection