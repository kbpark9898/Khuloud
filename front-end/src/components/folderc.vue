<template>
	<div>
		<v-toolbar flat>
			<v-toolbar-title>내 드라이브</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="검색"
				single-line
				hide-details
			></v-text-field>
		</v-toolbar>
		<v-list two-line subheader>
			<!-- <v-subheader inset>Folders</v-subheader> -->
			<!-- Folder view -->
			<v-list-item @click="" @dblclick="$router.go(-1)">...</v-list-item>
			<v-list-item
				v-for="item in this.$store.getters.folderL"
				:key="item.folder_id"
				:search="search"
				@click.right="show(item, $event)"
				@click=""
				@dblclick="
					$router.push({
						name: 'Folder',
						params: { id: item.folder_id },
					})
				"
			>
				<v-list-item-avatar>
					<v-icon>mdi-folder</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="item.folder_name"></v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-icon v-if="item.favorite === 0">
						mdi-star-outline
					</v-icon>
					<v-icon v-else>
						mdi-star
					</v-icon>
				</v-list-item-action>
			</v-list-item>
			<!-- File view -->
			<v-list-item
				v-for="item in this.$store.getters.fileL"
				:key="item.title"
				@click.right="showF(item, $event)"
				@dblclick="
					detailF(item, $event);
					file_detail(item);
				"
				@click=""
			>
				<v-list-item-avatar>
					<v-icon> mdi-file</v-icon>
				</v-list-item-avatar>
				<v-list-item-content>
					<v-list-item-title v-text="item.file_name"></v-list-item-title>
				</v-list-item-content>
				<v-list-item-action>
					<v-icon v-if="item.favorite === 0">
						mdi-star-outline
					</v-icon>
					<v-icon v-else>
						mdi-star
					</v-icon>
				</v-list-item-action>
			</v-list-item>
		</v-list>
		<!--file detial -->
		<v-dialog v-model="showdetailF" max-width="290">
			<v-card>
				<v-card-title class="headline">
					<v-text-field v-model="current_filename"></v-text-field>
				</v-card-title>
				<v-card-text>
					<v-text-field v-model="current_filedata"></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="green darken-1"
						text
						@click="
							showdetailF = false;
							modify_file();
						"
					>
						save
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<!-- file share menu -->
		<v-dialog v-model="showShareF" width="500px">
			<v-card>
				<v-card-title>
					Share File
				</v-card-title>
				<v-card-text>
					<v-text-field v-model="this.cfilename.file_name"></v-text-field>
				</v-card-text>
				<v-card-text>
					<v-text-field
						v-model="targetUid"
						label="target user id"
					></v-text-field>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click.prevent="file_share">ok</v-btn>
					<v-btn @click="showShareF = false">cancle</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<!-- Move Folder -->
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
		<!-- sub menu for folder -->
		<v-menu
			v-model="showMenu"
			:position-x="x"
			:position-y="y"
			absolute
			offset-y
		>
			<v-list dense>
				<v-list-item @click.prevent="dialog2 = !dialog2">
					<v-list-item-icon>
						<v-icon>mdi-send</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>이동</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click.prevent="deleteF">
					<v-list-item-icon>
						<v-icon>mdi-delete</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>삭제</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="curfName.favorite === 1" @click="delete_favorite">
					<v-list-item-icon>
						<v-icon>mdi-star-outline</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>즐겨 찾기 삭제</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="curfName.favorite === 0" @click="add_favorite">
					<v-list-item-icon>
						<v-icon>mdi-star</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>즐겨 찾기 추가</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-menu>
		<!--  -->
		<!-- Move File -->
		<v-dialog v-model="dialog3" width="500px">
			<v-card>
				<v-card-title class="grey darken-2">
					Move File
				</v-card-title>
				<v-container>
					<v-list>
						<v-list-item
							v-for="item2 in folders"
							:key="item2.folder_id"
							@click.left="transferFile(item2.folder_name)"
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
		<!-- sub menu for file -->
		<v-menu
			v-model="showMenuF"
			:position-x="x"
			:position-y="y"
			absolute
			offset-y
		>
			<v-list dense>
				<v-list-item @click.prevent="dialog3 = !dialog3">
					<v-list-item-icon>
						<v-icon>mdi-send</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>이동</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click.prevent="delete_file">
					<v-list-item-icon>
						<v-icon>mdi-delete</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>삭제</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click.prevent="download_file">
					<v-list-item-icon>
						<v-icon>mdi-download</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>다운로드</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item
					v-if="cfilename.favorite === 1"
					@click="delete_favorite_file"
				>
					<v-list-item-icon>
						<v-icon>mdi-star-outline</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>즐겨 찾기 삭제</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item v-if="cfilename.favorite === 0" @click="add_favorite_file">
					<v-list-item-icon>
						<v-icon>mdi-star</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>즐겨 찾기 추가</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item @click.prevent="showShareF = !showShareF">
					<v-list-item-icon>
						<v-icon>fas fa-share-alt</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>공유 하기</v-list-item-title>
					</v-list-item-content>
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
		<!-- Create Folder -->
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
	moveFile,
	delFavoriteFile,
	addFavoriteFile,
	detailFile,
	modifyFile,
	shareFile,
} from '../api/index';
import Axios from 'axios';

export default {
	props: {
		folderId: Number,
	},
	data() {
		return {
			folder_id: this.$route.params.id,
			uploadedfile: null,
			foldername: '',
			curfName: {},
			cfilename: {},
			folders: [],
			files: [],
			search: '',
			id: '',
			share_file_name: '',
			showShareF: false,
			targetUid: '',
			current_filename: null, //파일 상세정보 (이름)
			current_filedata: null, //파일 상세정보 (내용)
			dialog: false,
			howMenu: false,
			showMenu: false,
			showMenuF: false, //파일 관련 메뉴
			showdetailF: false, //txt 파일 상세정보 및 수정
			x: 0,
			y: 0,
			dialog2: false,
			dialog3: false, //파일 관련 메뉴
			detail: {
				dataname: null,
				date: null,
				owner_id: null,
				datasize: null,
				datatype: null,
			},
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
				console.log(this.$route.params.id);
				const curData = {
					id: this.$store.state.id,
					folder_id: this.$route.params.id,
				};
				console.log(curData);
				const response = await folder(curData);
				// const file_response = await file(curData);
				this.$store.commit('setFolder', response.data.folders);
				this.$store.commit('setCur', response.data.cur);
				this.$store.commit('setParent', response.data.parentPath);
				this.$store.commit('setFile', response.data.files);
				this.folders = this.$store.getters.folderL;
				console.log(this.$store.getters.fileL);
				this.files = this.$store.getters.fileL;
			} catch (error) {
				console.log('에러');
				console.log(error);
			}
		},
		handleFileUpload() {
			this.uploadedfile = this.$refs.uploadedfile.files[0];
			console.log(this.uploadedfile);
		},
		initFolderName() {
			this.foldername = '';
		},
		cancelMove() {
			this.curfName = {};
			this.cfilename = {};
			this.dialog2 = false;
			this.dialog3 = false;
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
				const file_response = await file(curData);
				console.log(response.data);
				this.$store.commit('setFolder', response.data.folders);
				this.$store.commit('setFile', file_response.data.files);
				this.$store.commit('setCur', response.data.cur);
				this.$store.commit('setParent', response.data.parentPath);
				this.folders = this.$store.getters.folderL;
				this.files = this.$store.getters.fileL;
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
				const file_response = await file(cData);
				console.log(response.data);
				this.$store.commit('setFolder', response.data.folders);
				this.$store.commit('setFile', file_response.data.files);
				this.$store.commit('setCur', response.data.cur);
				this.$store.commit('setParent', response.data.parentPath);
				this.folders = this.$store.getters.folderL;
				this.files = this.$store.getters.fileL;
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
					name: this.curfName.folder_name,
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
		async delete_file() {
			try {
				var itemlist = this.$store.getters.fileL;
				const currentData = {
					fileName: null,
					user_id: null,
					cur: this.$store.state.cur,
				};
				for (var i = 0; i < itemlist.length; i++) {
					if (itemlist[i].file_name == this.cfilename.file_name) {
						currentData.fileName = itemlist[i].file_name;
						currentData.user_id = itemlist[i].user_id;
					}
				}
				const filelistData = {
					id: currentData.user_id,
					cur: currentData.cur,
				};
				const response = await deleteFile(currentData);
				setTimeout(function() {}, 500);
				const filelist = await file(filelistData);
				this.$store.commit('setFile', filelist.data.files);
				this.files = this.$store.getters.fileL;
			} catch (error) {
				console.log('에러');
				console.log(error);
			}
		},
		async download_file() {
			try {
				const currentData = {
					fileName: this.cfilename.file_name,
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
		async delete_favorite_file() {
			try {
				const fData = {
					id: this.$store.state.id,
					cur: this.$store.state.cur,
					name: this.cfilename.file_name,
				};
				console.log(fData);
				const response = await delFavoriteFile(fData);
				this.$store.commit('setFile', response.data.files);
			} catch (error) {
				console.log('에러');
			}
		},
		async add_favorite_file() {
			try {
				const fData = {
					id: this.$store.state.id,
					cur: this.$store.state.cur,
					name: this.cfilename.file_name,
				};
				console.log(fData);
				const response = await addFavoriteFile(fData);
				this.$store.commit('setFile', response.data.files);
			} catch (error) {
				console.log('에러');
			}
		},
		async transferFile(folderName) {
			try {
				const fData = {
					id: this.$store.state.id,
					cur: this.$store.state.cur,
					name: this.cfilename.file_name,
					isfolder: false,
					newPath: this.$store.state.cur + folderName + '/',
				};
				const response = await moveFile(fData);
				console.log(response);
				this.$store.commit('setFile', response.data.files);
				this.files = this.$store.getters.fileL;
			} catch (error) {
				console.log('에러');
				console.log(error.response.data);
			} finally {
				this.cfilename = {};
				this.dialog3 = false;
			}
		},
		async file_detail() {
			try {
				const currentData = {
					id: this.cfilename.user_id,
					cur: this.cfilename.location,
					fileName: this.cfilename.file_name,
				};
				const detailData = await detailFile(currentData);
				this.current_filename = detailData.data.file_name;
				this.current_filedata = detailData.data.content;
				console.log(this.current_filename);
				console.log(this.current_filedata);
			} catch (error) {
				console.log('에러');
				console.log(error);
			}
		},
		async modify_file() {
			try {
				const modifyData = {
					user_id: this.cfilename.user_id,
					cur: this.cfilename.location,
					name: this.current_filename,
					content: this.current_filedata,
				};
				const result = await modifyFile(modifyData);
				const after_data = {
					id: this.cfilename.user_id,
					cur: this.cfilename.location,
					fileName: this.current_filename,
				};
				const detailData = await detailFile(after_data);
			} catch (error) {
				console.log('에러');
				console.log(error);
			}
		},
		async file_share() {
			try {
				const shareData = {
					id: this.$store.state.id,
					cur: this.$store.state.cur,
					file_name: this.cfilename.file_name,
					target_id: this.targetUid,
				};
				const response = await shareFile(shareData);
				if (response.status == 200) {
					alert('파일 공유 완료');
				}
			} catch (error) {
				console.log('에러');
				alert('존재 하지 않은 유저입니다.');
			} finally {
				this.showShareF = false;
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
		detailF(fileObj, e) {
			e.preventDefault();
			this.cfilename = fileObj;
			this.showdetailF = false;
			this.x = e.clientX;
			this.y = e.clientY;
			this.$nextTick(() => {
				this.showdetailF = true;
			});
		},
	},
};
</script>
