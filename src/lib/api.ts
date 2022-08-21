import type { Session } from 'lucia-sveltekit/types'
import { join } from 'path'

/**
 * 
 * @param useAuth if false, dont include Auth header, else include session
 * @param route sub route
 * @param options 
 * @returns Promise<Response>
 */
export default async function api(useAuth: false | Session<User>, route: string, options?: RequestInit): Promise<Response> {
    return await fetch(route, {
        ...options,
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            ...(useAuth?{ 'Authorizaton': `Bearer ${useAuth?.access_token}` }:{})
        }
    })
}