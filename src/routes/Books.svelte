<script lang="ts">
	import BookCard from '../components/BookCard.svelte'
	import type { Book } from '../interfaces/Book'
	import { onMount } from 'svelte'

	let books: Book[] = []

	onMount(async () => {
		const res = await fetch('http://localhost:4000/books')
		books = await res.json()
	})
</script>

<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-2">
	{#each books as book}
		<BookCard {book} bind:books />
	{/each}
</div>

<svelte:head>
	<title>Books</title>
</svelte:head>
