<script setup>
import RepoList from "@/components/RepoList.vue"
import SearchBar from "@/components/SearchBar.vue"
import UserProfile from "@/components/UserProfile.vue"
import { getRepos, getUser } from "@/services/gitHubApi"
import { ref } from "vue"


const user = ref(null)
const repos = ref([])
const username = ref("")

const searchUser = async (name) => {
    username.value = name
    user.value = await getUser(name)
    repos.value = await getRepos(name)
}
</script>

<template>
    <div class="max-w-2xl mx-auto p-6 pt-20">
        <SearchBar @search="searchUser" />
        <UserProfile :user="user" />
        <RepoList :repos="repos" />

    </div>
</template>