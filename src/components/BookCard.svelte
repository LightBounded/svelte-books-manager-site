<script lang="ts">
	import type { Book } from '../interfaces/Book'

	export let book: Book
	export let books: Book[]

	const deleteBook = id => {
		console.log(id)
		books = books.filter(book => book.id != id)
		fetch(`http://localhost:4000/books/${id}`, {
			method: 'DELETE',
		})
	}
</script>

<div class="card card-bordered bg-neutral">
	<figure>
		<img src="data:image/*;base64,{book.image}" alt="book" />
	</figure>
	<div class="card-body">
		<h2 class="card-title mb-0">
			{book.title}
		</h2>
		<div class="mb-3">By {book.author}</div>
		<p>
			{book.description}
		</p>
		<div class="justify-end card-actions">
			<button class="btn btn-error" on:click={() => deleteBook(book.id)}
				>Delete Book</button
			>
		</div>
	</div>
</div>
