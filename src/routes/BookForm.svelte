<script lang="ts">
	import { createForm } from 'svelte-forms-lib'
	import * as yup from 'yup'
	import { v4 as uuid } from 'uuid'

	const reader = new FileReader()
	reader.onload = () => ($form.image = (reader.result as string).split(',')[1])

	$: console.log($form.image)

	const getImageURL = (e: Event) => {
		reader.readAsDataURL((e.target as HTMLInputElement).files[0])
	}

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			title: '',
			author: '',
			image: '',
			description: '',
		},
		validationSchema: yup.object().shape({
			title: yup.string().required('A title must be entered.'),
			author: yup.string().required('An author must be entered.'),
			image: yup.string().required('An image must be selected.'),
			description: yup.string().required('A description must be entered. 	'),
		}),
		onSubmit: values => {
			console.log(values)
			fetch('http://localhost:4000/books', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ id: uuid(), ...values }),
			})
		},
	})
</script>

<svelte:head>
	<title>Add a Book</title>
</svelte:head>

<form on:submit={handleSubmit} class="bg-neutral rounded-lg max-w-md mx-auto p-4">
	<div class="form-control">
		<label class="label pt-0" for="title">
			<span class="label-text">Title</span>
		</label>
		<input
			on:blur={handleChange}
			class:input-error={$errors.title}
			name="title"
			id="title"
			type="text"
			placeholder="title"
			class="input"
		/>
		{#if $errors.title}
			<label class="label" for="title">
				<span class="label-text-alt text-error"> {$errors.title}</span>
			</label>
		{/if}
	</div>
	<div class="form-control">
		<label class="label" for="author">
			<span class="label-text">Author</span>
		</label>
		<input
			on:blur={handleChange}
			class:input-error={$errors.author}
			name="author"
			id="author"
			type="text"
			placeholder="author"
			class="input"
		/>
		{#if $errors.author}
			<label class="label" for="author">
				<span class="label-text-alt text-error"> {$errors.author}</span>
			</label>
		{/if}
	</div>
	<div class="form-control">
		<label class="label" for="image">
			<span class="label-text">Image</span>
		</label>
		<input
			on:change={getImageURL}
			class:input-error={$errors.image}
			accept="image/*"
			name="image"
			id="image"
			type="file"
			placeholder="image"
			class="input pl-0 file:btn file:btn-secondary file:rounded-r-none file:border-none file:rounded-none file:mr-4 file:no-animation"
		/>
		{#if $errors.image}
			<label class="label" for="image">
				<span class="label-text-alt text-error"> {$errors.image}</span>
			</label>
		{/if}
	</div>
	<div class="form-control">
		<label class="label" for="description">
			<span class="label-text">Description</span>
		</label>
		<textarea
			on:blur={handleChange}
			class:input-error={$errors.description}
			name="description"
			id="description"
			class="textarea h-24"
			placeholder="description"
		/>
		{#if $errors.description}
			<label class="label" for="description">
				<span class="label-text-alt text-error"> {$errors.description}</span>
			</label>
		{/if}
	</div>
	<button type="submit" class="btn btn-primary mt-5">Add Book</button>
</form>
