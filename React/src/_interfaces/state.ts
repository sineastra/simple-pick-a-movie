export interface userData {
	_id: string,
	name: string,
	iat?: number,
}
export interface userSliceIntF {
	loggedUser: userData | null
}
export interface notifSliceIntF {
	notif: string
}