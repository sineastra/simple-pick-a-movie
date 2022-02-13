import { BaseSyntheticEvent } from "react"
import { userRequests } from "../../requests/user"
import { useNavigate } from "react-router-dom"
import styles from "./SignIn.module.scss"
import store from "../../_state/app/store"
import { changeUser } from "../../_state/features/userSlice"
import jwt_decode from "jwt-decode"
import { userData } from "../../_interfaces/state"

const SignIn = () => {
    const navigate = useNavigate()

    const processAuth = async (type: string, e: BaseSyntheticEvent) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const formDataObj: any = Object.fromEntries(formData)
        let result

        type === "signIn"
            ? (result = await userRequests.signIn(formDataObj))
            : (result = await userRequests.register(formDataObj))

        const deserializedJWT = jwt_decode(result.token)
        store.dispatch(changeUser(deserializedJWT as userData))

        navigate("/")
    }

    return (
        <div className={styles.wrapper}>
            <h2>
                Minimal auth with everything stripped whatsoever.
                <br />
                <br />
                <span>
                    <span className={styles.coolSpan}>There are</span>, however errors{" "}
                    (<span className={styles.coolSpan}>notifications</span>) from Express
                    about existing user and wrong password.
                </span>
            </h2>
            <section>
                <form onSubmit={e => processAuth("signIn", e)} autoComplete="off">
                    <h1>Sign In</h1>
                    <input type="text" name="name" placeholder="username" />
                    <input type="text" name="password" placeholder="password" />
                    <button>Login</button>
                </form>

                <form onSubmit={e => processAuth("register", e)} autoComplete="off">
                    <h1>Register</h1>
                    <input type="text" name="name" placeholder="username" />
                    <input type="text" name="password" placeholder="password" />
                    <button>Register</button>
                </form>
            </section>
        </div>
    )
}

export default SignIn
