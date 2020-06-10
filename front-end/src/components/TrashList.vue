<template>
	<div>
		<v-toolbar flat>
			<v-toolbar-title>휴지통</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn @click="delAll">비우기</v-btn>
		</v-toolbar>
		<v-list>
			<!-- <v-subheader inset>Folders</v-subheader> -->
			<!-- Folder view -->
			<v-list-item
				v-for="item in this.$store.getters.trashFolderL"
				:key="item.folder_id"
				:search="search"
				@click.right="show(item, $event)"
				@click=""
			>
				<v-list-item-avatar>
					<v-icon>mdi-folder</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="item.folder_name"></v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<!-- File view -->
			<v-list-item
				v-for="item in this.$store.getters.trashFileL"
				:key="item.title"
				@click.right="showF(item, $event)"
			>
				<v-list-item-avatar>
					<v-icon> mdi-file</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="item.file_name"></v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-menu
			v-model="showMenu"
			:position-x="x"
			:position-y="y"
			absolute
			offset-y
		>
			<v-list dense>
				<v-list-item @click.prevent="delFolder">
					<v-list-item-icon>
						<v-icon>mdi-delete</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>삭제</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click.prevent="transferF">
					<v-list-item-icon>
						<v-icon>fas fa-trash-restore</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>복원</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-menu>
		<v-menu
			v-model="showMenuF"
			:position-x="x"
			:position-y="y"
			absolute
			offset-y
		>
			<v-list dense>
				<v-list-item @click.prevent="delFile">
					<v-list-item-icon>
						<v-icon>mdi-delete</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>삭제</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click.prevent="transferFile">
					<v-list-item-icon>
						<v-icon>fas fa-trash-restore</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>복원</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
import {
	tdelFolder,
	tdelFile,
	tdelAll,
	moveFolder,
	moveFile,
	showTrashcan,
} from '../api/index';
export default {
	data() {
		return {
			curfName: {},
			showMenu: false,
			search: '',
			x: 0,
			y: 0,
			cfilename: {},
			showMenuF: false,
		};
	},
	created() {
		this.fetchData();
	},
	watch: {
		$route: 'fetchData',
	},
	methods: {
		async fetchData() {
			try {
				const id = this.$store.state.id;
				const response = await showTrashcan(id);
				console.log(response.data);
				this.$store.commit('settrashFolderList', response.data.folders);
				this.$store.commit('settrashFileList', response.data.files);
			} catch (error) {
				console.log('에러');
			}
		},
		async delFolder() {
			try {
				const tData = {
					id: this.$store.state.id,
					folder_id: this.curfName.folder_id,
				};
				const response = await tdelFolder(tData);
				this.$store.commit('settrashFolderList', response.data.folders);
			} catch (error) {
				console.log('에러');
				alert('삭제 실패');
			}
		},
		async delFile() {
			try {
				const tData = {
					id: this.$store.state.id,
					folder_id: this.cfilename.file_id,
				};
				const response = await tdelFile(tData);
				this.$store.commit('settrashFileList', response.data.files);
			} catch (error) {
				console.log('에러');
				alert('삭제 실패');
			}
		},
		async delAll() {
			try {
				const id = this.$store.state.id;
				const response = await tdelAll(id);
				this.$store.commit('settrashFolderList', response.data.folders);
				this.$store.commit('settrashFileList', response.data.files);
			} catch (error) {
				console.log('에러');
				alert('삭제 실패');
			}
		},
		async transferF() {
			try {
				const cData = {
					id: this.$store.state.id,
					cur: '/trashcan/',
					name: this.curfName.folder_name,
					isfolder: true,
					newPath: '/',
				};
				const response = await moveFolder(cData);
				console.log(response);
				this.$store.commit('settrashFolderList', response.data.folders);
			} catch (error) {
				console.log('에러');
				console.log(error.response.data);
			}
		},
		async transferFile() {
			try {
				const fData = {
					id: this.$store.state.id,
					cur: '/trashcan/',
					name: this.cfilename.file_name,
					isfolder: false,
					newPath: '/',
				};
				const response = await moveFile(fData);
				console.log(response);
				this.$store.commit('settrashFileList', response.data.files);
			} catch (error) {
				console.log('에러');
				console.log(error.response.data);
			}
		},
		show(folderObj, e) {
			e.preventDefault();
			this.curfName = folderObj;
			this.showMenu = false;
			this.x = e.clientX;
			this.y = e.clientY;
			this.$nextTick(() => {
				this.showMenu = true;
			});
		},
		showF(fileObj, e) {
			e.preventDefault();
			this.cfilename = fileObj;
			this.showMenuF = false;
			this.x = e.clientX;
			this.y = e.clientY;
			this.$nextTick(() => {
				this.showMenuF = true;
			});
		},
	},
};
</script>

<style></style>
