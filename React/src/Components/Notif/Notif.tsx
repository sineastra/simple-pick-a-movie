import React from "react"
import styles from "./Notif.module.scss"

const Notif = ({ msg }: { msg: string }) => {

	return (
		<div className={ styles.notif }>{ msg }</div>
	)
}

export default Notif