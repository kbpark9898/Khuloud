<template>
	<v-app id="inspire">
		<v-navigation-drawer
			v-model="drawer"
			:clipped="$vuetify.breakpoint.lgAndUp"
			app
			v-if="isUserLogin"
		>
			<v-list dense>
				<v-list-item router :to="{ name: 'Main' }" exact>
					<v-list-item-action>
						<v-icon>mdi-home</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>홈</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item router :to="{ name: 'File' }" exact>
					<v-list-item-action>
						<v-icon>mdi-file</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>파일</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item router :to="{ name: 'Fav' }" exact>
					<v-list-item-action>
						<v-icon>mdi-heart</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>즐겨찾기</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item router :to="{ name: 'Quick' }" exact>
					<v-list-item-action>
						<v-icon>mdi-history</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>빠른 액세스</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item router :to="{ name: 'Contact' }" exact>
					<v-list-item-action>
						<v-icon>mdi-contacts</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>연락처</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item router :to="{ name: 'Trash' }" exact>
					<v-list-item-action>
						<v-icon>mdi-delete</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>휴지통</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item router :to="{ name: 'Feedback' }" exact>
					<v-list-item-action>
						<v-icon>mdi-message</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>피드백</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
				<v-list-item router :to="{ name: 'Main' }" exact>
					<v-list-item-action>
						<v-icon>mdi-help-circle</v-icon>
					</v-list-item-action>
					<v-list-item-content>
						<v-list-item-title>도움말</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar
			:clipped-left="$vuetify.breakpoint.lgAndUp"
			app
			color="blue darken-3"
			dark
		>
			<v-app-bar-nav-icon
				@click.stop="drawer = !drawer"
				v-if="isUserLogin"
			></v-app-bar-nav-icon>
			<v-toolbar-title style="width: 300px" class="ml-0 pl-4">
				<span class="hidden-sm-and-down">KhuLoud</span>
			</v-toolbar-title>
			<template v-if="isUserLogin">
				<v-text-field
					flat
					solo-inverted
					hide-details
					prepend-inner-icon="mdi-magnify"
					label="전체 검색"
					class="hidden-sm-and-down"
				></v-text-field>
			</template>
			<template v-else>
				<div></div>
			</template>
			<v-spacer></v-spacer>
			<template v-if="isUserLogin">
				<v-btn icon @click="logoutUser">
					<v-icon>mdi-login</v-icon>
				</v-btn>
			</template>
			<template v-else>
				<v-btn icon @click="$router.push({ name: 'Login' })">
					<v-icon>mdi-login</v-icon>
				</v-btn>
				<v-btn icon @click="$router.push({ name: 'RegistUser' })">
					<v-icon>mdi-account</v-icon>
				</v-btn>
			</template>
		</v-app-bar>
		<v-content>
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
		drawer: null,
		items: [
			{ icon: 'mdi-home', text: '홈' },
			{ icon: 'mdi-file', text: '파일' },
			{ icon: 'mdi-heart', text: '즐겨찾기' },
			{ icon: 'mdi-history', text: '빠른 액세스' },
			{ icon: 'mdi-contacts', text: '연락처' },
			{ icon: 'mdi-settings', text: '설정' },
			{ icon: 'mdi-message', text: '피드백' },
			{ icon: 'mdi-help-circle', text: '도움말' },
		],
	}),
	computed: {
		isUserLogin() {
			return this.$store.getters.isLogin;
		},
	},
	methods: {
		logoutUser() {
			this.$store.commit('clearid');
			this.$router.push('/');
		},
	},
};
</script>

<style></style>
