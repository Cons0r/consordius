import auth from "$lib/lucia"
import { error } from "@sveltejs/kit"
import type { Action } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
export const GET: RequestHandler = async ({ request }) => {
    try {
        await auth.validateRequest(request)
        const number = Math.floor(Math.random() * 999)
        return new Response(String(number))
    } catch {
        throw error(401, "Unauthorized.")
    }
}