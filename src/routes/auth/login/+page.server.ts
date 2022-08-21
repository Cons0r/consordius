import auth from "$lib/lucia"
import { redirect as SKredirect, type Action, error as SKerror } from "@sveltejs/kit"
import type { Error } from "lucia-sveltekit"

export const POST: Action = async ({ request, setHeaders, url }) => {
    const body = await request.json()
    const username = body.username
    const password = body.password
    if (!username || !password) {
        throw SKerror(400, "A Field was left empty")
    }
    try {
        const authenticateUser = await auth.authenticateUser("username", username, password)
        setHeaders({
            "set-cookie": authenticateUser.cookies
        })
        return
    } catch (e) {
        const error = e as Error
        if (error.message === "AUTH_INVALID_IDENTIFIER_TOKEN" || error.message === "AUTH_INVALID_PASSWORD") {
            throw SKerror(400, "Incorrect email or password.")
        }
        throw SKerror(500, "Unkown error occurred.")
    }
}