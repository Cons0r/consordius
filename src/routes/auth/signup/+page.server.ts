import auth from "$lib/lucia"
import { redirect as SKredirect, type Action, error as SKerror } from "@sveltejs/kit"
import type { Error } from "lucia-sveltekit"

export const POST: Action = async ({ request, setHeaders,  url }) => {
    const body = await request.json()
    const username = body.username
    const password = body.password
    if (!username || !password) {
        throw SKerror(400, "A Field was left empty")
    }
    try {
        const createUser = await auth.createUser("username", username, {
            password,
            user_data: {
                username
            }
        })
        setHeaders({
            'set-cookie': createUser.cookies
        })
        return
    } catch (e) {
        const error = e as Error
        if (error.message === "AUTH_DUPLICATE_IDENTIFIER_TOKEN" || error.message === "AUTH_DUPLICATE_USER_DATA") {
            throw SKerror(400, "Username already taken.")
        }
        throw SKerror(500, "Unkown error occurred.")
    }
}