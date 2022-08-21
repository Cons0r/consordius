<script lang="ts">
	let username: string;
	let password: string;

	let error = '';

	const login = async () => {
		error = '';
		const response = await fetch('/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		});
		if (response.ok) return (window.location.href = '/profile');
		const result = await response.json();
		error = result.error;
	};

	const signup = async () => {
		error = '';
		const response = await fetch('/auth/signup', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		});
		if (response.ok) return (window.location.href = '/profile');
		const result = await response.json();
		error = result.error;
	};
</script>

<div class="center">
	<label for="username">username</label>
	<input id="username" type="text" bind:value={username} />
	<label for="password">password</label>
	<input id="password" type="password" bind:value={password} />
	<button on:click={login}>Sign in</button>
	<button on:click={signup}>Create an account</button>
	<p class="error">{error}</p>
</div>