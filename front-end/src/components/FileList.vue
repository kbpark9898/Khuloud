<template>
	<div>
		<v-toolbar flat>
			<v-toolbar-title>파일 </v-toolbar-title>
			<v-spacer></v-spacer>
			<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="파일 검색"
				single-line
				hide-details
			></v-text-field>
		</v-toolbar>
		<v-list two-line subheader>
			<v-subheader inset>Folders</v-subheader>
			<v-list-item v-if="this.$store.state.cur !== '/'" @click="moveParent"
				>...</v-list-item
			>
			<v-list-item
				v-for="item in this.$store.getters.folderL"
				:key="item.title"
				:search="search"
				@click.right="show(item, $event)"
				@click.left="moveF(item.folder_name)"
			>
				<v-list-item-avatar>
					<v-icon>mdi-folder</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="item.folder_name"></v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-icon v-if="item.favorite === 0" color="grey lighten-1">
						mdi-star-border
					</v-icon>

					<v-icon v-else color="yellow">
						mdi-star
					</v-icon>
				</v-list-item-action>
			</v-list-item>

			<v-divider inset></v-divider>
			<v-subheader inset>Files</v-subheader>
			<v-list-item v-for="item in this.$store.getters.fileL" :key="item.title">
				<v-list-item-avatar>
					<v-icon> mdi-file</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="item.file_name"></v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn icon @click="download_file(item.file_name)">
						<v-icon color="grey lighten-1">mdi-download</v-icon>
					</v-btn>
					<v-btn icon @click="delete_file(item.file_name)">
						<v-icon color="grey lighten-1">mdi-delete</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>

		<v-dialog v-model="dialog2" width="500px">
			<v-card>
				<v-card-title class="grey darken-2">
					Move Folder
				</v-card-title>
				<v-container>
					<v-list>
						<v-list-item
							v-for="item2 in folders"
							:key="item2.folder_id"
							@click.left="transferF(item2.folder_name)"
							v-if="item2.folder_name !== curfName.folder_name"
						>
							<v-list-item-avatar>
								<v-icon>mdi-folder</v-icon>
							</v-list-item-avatar>
							<v-list-item-content>
								<v-list-item-title
									v-text="item2.folder_name"
								></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-container>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text color="primary" @click="cancelMove">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-menu
			v-model="showMenu"
			:position-x="x"
			:position-y="y"
			absolute
			offset-y
		>
			<v-list dense>
				<v-list-item @click.prevent="dialog2 = !dialog2">
					<v-list-item-title>이동</v-list-item-title>
				</v-list-item>
				<v-list-item @click.prevent="deleteF">
					<v-list-item-title>삭제</v-list-item-title>
				</v-list-item>
				<v-list-item v-if="curfName.favorite === 1" @click="delete_favorite">
					<v-list-item-title>즐겨 찾기 삭제</v-list-item-title>
				</v-list-item>
				<v-list-item v-if="curfName.favorite === 0" @click="add_favorite">
					<v-list-item-title>즐겨 찾기 추가</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>

		<input
			id="file-selector"
			ref="uploadedfile"
			type="file"
			v-on:change="handleFileUpload()"
		/>
		<br />
		<v-btn color="blue" @click="upload_file">upload</v-btn>
		<v-btn bottom color="blue" dark fab fixed right @click="dialog = !dialog">
			<v-icon>mdi-plus</v-icon>
		</v-btn>
		<v-dialog v-model="dialog" width="500px">
			<v-card>
				<v-card-title class="grey darken-2">
					Create Folder
				</v-card-title>
				<v-container>
					<div>
						<v-icon>mdi-folder</v-icon>
						<v-text-field
							placeholder="name"
							id="foldername"
							type="text"
							v-model="foldername"
						></v-text-field>
					</div>
				</v-container>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
					<v-btn text @click="makeF">Create</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import {
	folder,
	makeFolder,
	deleteFolder,
	moveFolder,
	file,
	uploadFile,
	deleteFile,
	downloadFile,
	delFavorite,
	addFavorite,
} from '../api/index';
import Axios from 'axios';

export default {
	data() {
		return {
			uploadedfile: null,
			foldername: '',
			curfName: {},
			folders: [],
			files: [],
			search: '',
			id: '',
			dialog: false,
			howMenu: false,
			showMenu: false,
			x: 0,
			y: 0,
			dialog2: false,
			detail: {
				dataname: null,
				date: null,
				owner_id: null,
				datasize: null,
				datatype: null,
			},
		};
	},
	async created() {
		try {
			const curData = {
				id: this.$store.state.id,
				cur: '/',
			};
			console.log(curData);
			const response = await folder(curData);
			const file_response = await file(curData);
			this.$store.commit('setFolder', response.data.folders);
			this.$store.commit('setCur', response.data.cur);
			this.$store.commit('setParent', response.data.parentPath);
			this.$store.commit('setFile', file_response.data.files);
			this.folders = this.$store.getters.folderL;
			console.log(this.$store.getters.fileL);
			this.files = this.$store.getters.fileL;
		} catch (error) {
			console.log('에러');
			console.log(error);
		}
	},
	methods: {
		handleFileUpload() {
			this.uploadedfile = this.$refs.uploadedfile.files[0];
			console.log(this.uploadedfile);
		},
		initFolderName() {
			this.foldername = '';
		},
		cancelMove() {
			this.curfName = {};
			this.dialog2 = false;
		},
		async makeF() {
			try {
				const folderData = {
					user_id: this.$store.state.id,
					cur: this.$store.state.cur,
					folder_name: this.foldername,
				};
				const response = await makeFolder(folderData);
				console.log(response.data);
				console.log('폴더 생성 완료');
				this.$store.commit('setFolder', response.data.folders);
				this.folders = response.data.folders;
			} catch (error) {
				console.log('에러');
				console.log(error.response.data);
			} finally {
				this.initFolderName();
				this.dialog = false;
			}
		},
		async moveF(move_folder_name) {
			try {
				const curData = {
					id: this.$store.state.id,
					cur: this.$store.state.cur + move_folder_name + '/',
				};
				const response = await folder(curData);
				console.log(response.data);
				this.$store.commit('setFolder', response.data.folders);
				this.$store.commit('setCur', response.data.cur);
				this.$store.commit('setParent', response.data.parentPath);
				this.folders = this.$store.getters.folderL;
			} catch (error) {
				console.log('에러');
				console.log(error.response.data);
			}
		},
		async moveParent() {
			try {
				const cData = {
					id: this.$store.state.id,
					cur: this.$store.state.parent,
				};
				const response = await folder(cData);
				console.log(response.data);
				this.$store.commit('setFolder', response.data.folders);
				this.$store.commit('setCur', response.data.cur);
				this.$store.commit('setParent', response.data.parentPath);
				this.folders = this.$store.getters.folderL;
			} catch (error) {
				console.log('에러');
				console.log(error.response.data);
			}
		},
		async deleteF() {
			try {
				const cData = {
					id: this.$store.state.id,
					cur: this.$store.state.cur,
					folder_name: this.curfName.folder_name,
				};
				const response = await deleteFolder(cData);
				console.log(response);
				this.$store.commit('setFolder', response.data.folders);
				this.folders = this.$store.getters.folderL;
			} catch (error) {
				console.log('에러');
				console.log(error.response.data);
			} finally {
				this.curfName = '';
			}
		},
		async transferF(folderName) {
			try {
				const cData = {
					id: this.$store.state.id,
					cur: this.$store.state.cur,
					folder_name: this.curfName.folder_name,
					isfolder: true,
					newPath: this.$store.state.cur + folderName + '/',
				};
				const response = await moveFolder(cData);
				console.log(response);
				this.$store.commit('setFolder', response.data.folders);
				this.folders = this.$store.getters.folderL;
			} catch (error) {
				console.log('에러');
				console.log(error.response.data);
			} finally {
				this.initFolderName();
				this.curfName = {};
				this.dialog2 = false;
			}
		},
		async upload_file() {
			try {
				const formData = new FormData();
				formData.append('file', this.uploadedfile);
				formData.append('user_id', this.$store.state.id);
				formData.append('cur', this.$store.state.cur);
				const currentData = {
					id: this.$store.state.id,
					cur: this.$store.state.cur,
				};
				console.log(currentData);
				const response = await uploadFile(formData);
				const filelist = await file(currentData);
				console.log(filelist.data.files);
				this.$store.commit('setFile', filelist.data.files);
				console.log(this.$store.getters.fileL);
				this.files = this.$store.getters.fileL;
			} catch (error) {
				console.log('에러');
				console.log(error);
			}
		},
		async delete_file(itemName) {
			try {
				var itemlist = this.$store.getters.fileL;
				console.log(itemlist);
				console.log(itemName);
				const currentData = {
					fileName: null,
					user_id: null,
					cur: this.$store.state.cur,
				};

				for (var i = 0; i < itemlist.length; i++) {
					console.log(itemlist[i].file_name);
					if (itemlist[i].file_name == itemName) {
						currentData.fileName = itemlist[i].file_name;
						currentData.user_id = itemlist[i].user_id;
					}
				}
				const filelistData = {
					id: currentData.user_id,
					cur: currentData.cur,
				};
				console.log(currentData);
				const response = await deleteFile(currentData);
				setTimeout(function() {}, 500);
				const filelist = await file(filelistData);
				console.log(filelist.data.files);
				this.$store.commit('setFile', filelist.data.files);
				console.log(this.$store.getters.fileL);
				this.files = this.$store.getters.fileL;
			} catch (error) {
				console.log('에러');
				console.log(error);
			}
		},
		async download_file(namedata) {
			try {
				const currentData = {
					fileName: namedata,
					id: this.$store.state.id,
					cur: this.$store.state.cur,
				};
				const result = await downloadFile(currentData);
				console.log(result);
			} catch (error) {
				console.log('에러');
				console.log(error);
			}
		},
		async delete_favorite() {
			try {
				const cData = {
					id: this.$store.state.id,
					cur: this.$store.state.cur,
					name: this.curfName.folder_name,
				};
				console.log(cData);
				const response = await delFavorite(cData);
				this.$store.commit('setFolder', response.data.folders);
			} catch (error) {
				console.log('에러');
			}
		},
		async add_favorite() {
			try {
				const cData = {
					id: this.$store.state.id,
					cur: this.$store.state.cur,
					name: this.curfName.folder_name,
				};
				console.log(cData);
				const response = await addFavorite(cData);
				this.$store.commit('setFolder', response.data.folders);
			} catch (error) {
				console.log('에러');
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
	},
};
</script>
