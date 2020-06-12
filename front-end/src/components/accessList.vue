<template lang="html">
	<v-flex>
		<v-toolbar flat>
			<v-toolbar-title>빠른 액세스</v-toolbar-title>
		</v-toolbar>
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">File ID</th>
						<th class="text-left">Name</th>
						<th class="text-left">Dir</th>
						<th class="text-left">Date</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in recent_list" :key="item.name" @dblclick.stop = "dialog = true;download_file(item.file_name, item.location); ">
						<td>{{ item.file_id }}</td>
						<td>{{ item.file_name }}</td>
						<td>{{ item.location }}</td>
						<td>{{ item.date }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
		<v-divider></v-divider>
		<v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">알림</v-card-title>
        <v-card-text>
          다운로드에 성공했습니다!
        </v-card-text>
      </v-card>
    </v-dialog>
	</v-flex>
</template>

<script>
import { accessedList, downloadFile } from '../api/index';
import Axios from 'axios';
export default {
	data() {
		return {
			recent_list: [],
			dialog :false,
		};
	},
	async created() {
		try {
			const curData = {
				id: this.$store.state.id,
			};
			console.log(curData);
			const list_reponse = await accessedList(curData);
			this.$store.commit('setRecentList', list_reponse.data);
			this.recent_list = this.$store.getters.recentL;
			console.log(this.$store.getters.recentL);
		} catch (error) {
			console.log('에러');
			console.log(error);
		}
	},
	methods: {
		async download_file(name, dir) {
			try {
				const currentData = {
					fileName: name,
					id: this.$store.state.id,
					cur: dir
				};
				const result = await downloadFile(currentData);
				console.log(result);
			} catch (error) {
				console.log('에러');
				console.log(error);
			}
		},
	},
};
</script>

<style lang="css" scoped></style>
