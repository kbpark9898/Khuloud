<template>
	<div>
		<folderc v-bind:folderId="folderId"></folderc>
	</div>
</template>

<script>
import folderc from '../components/folderc';
export default {
	props: {
		folderId: Number,
	},
	components: {
		folderc,
	},
};
</script>

<style></style>
