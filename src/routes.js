import Books from './routes/Books.svelte'
import BookForm from './routes/BookForm.svelte'
import NotFound from './routes/NotFound.svelte'

export default {
	'/': Books,
	'/book-form': BookForm,
	'*': NotFound,
}
