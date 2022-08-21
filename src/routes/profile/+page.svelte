<script lang="ts">
import api from '$lib/api';

	import { signOut } from 'lucia-sveltekit/client';
    import { getSession } from "lucia-sveltekit/client"
    const lucia = getSession()

	const signOutUser = async () => {
		try {
			await signOut();
			window.location.href = '/';
		} catch {}
	};

	let number = 0;

	const getRandomNumber = async () => {
        const response = await api($lucia, '/auth/test/random')
		if (!response.ok) return;
		const result = await response.json();
		number = result;
	};
</script>

<div>
	<p>Username: {$lucia?.user.username}</p>
	<p>User id: {$lucia?.user.user_id}</p>
	<p>Number: {number}</p>
	<button on:click={getRandomNumber}>Get random number</button>
	<button on:click={signOutUser}>Sign out</button>
</div>