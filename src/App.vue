<template>
  <div style="margin: 80px 0 20px 0">
    <section class="splide">
      <div class="splide__track">
        <ul class="splide__list">
          <li
            class="splide__slide"
            v-for="(item, idx) in sortedAndSearchedPosts"
            v-bind:key="idx"
          >
            <img
              class="splide_img"
              :src="'http://95.179.188.38/' + item.image"
            />
            <img
              class="splide_img"
              :src="'http://95.179.188.38/' + item.image"
            />
          </li>
        </ul>
      </div>
    </section>
  </div>
  <div class="container" style="width: 80%">
    <div class="row">
      <div class="left_col col s9">
        <div>
          <div class="nav_links">
            All 3D Models / Collection: Awesome Crocodiles
          </div>
          <div class="col_name">
            {{ collection.collectionData.name }}
          </div>
          <div class="col_made_by">by <b>Niko Knappe</b></div>
          <div class="col_desc">
            {{ collection.collectionData.description }}
          </div>
          <div class="col_tags">
            {{ collection.collectionData.tags }}
          </div>
          <div class="col_search">
            <div class="search_open">[</div>
            <div>
              Search within the collection<input
                v-model="searchQuery"
                style="width: 225px; margin-left: 15px"
              />
              <img
                class="search_icon"
                src="./assets/images/Vector.png"
                alt="search"
              />
            </div>
            <div class="search_close">]</div>
          </div>
        </div>
      </div>
      <div class="right_col">
        <div class="col_stats">
          <div class="stats_item">
            <img src="./assets/images/1.png" alt="views" />
            <div class="item_data">
              <b>{{ collection.collectionData.views_count }}</b>
            </div>
          </div>
          <div class="stats_item">
            <img src="./assets/images/2.png" alt="views" />
            <div class="item_data">
              <b>{{ collection.collectionData.likes_count }}</b>
            </div>
          </div>
          <div class="stats_item">
            <img src="./assets/images/3.png" alt="views" />
            <div class="item_data">
              <b>{{ collection.collectionData.dislikes_count }}</b>
            </div>
          </div>
          <div><img src="./assets/images/4.png" alt="views" /></div>
          <div><img src="./assets/images/5.png" alt="views" /></div>
        </div>
        <div>
          <button class="col_btn">Add to your collections</button>
          <div class="input-field col 3" style="margin-left: 150px">
            <my-select
              v-model="selectedSort"
              v-bind:options="sortOptions"
              class="browser-default"
            ></my-select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div
        class="col s4"
        v-for="item in sortedAndSearchedPosts"
        v-bind:key="item"
      >
        <img
          class="col_img"
          :src="'http://95.179.188.38/' + item.image"
          alt="collection_image"
        />
        <div class="col_data">
          <div>
            <div>{{ item.model_name }}</div>
            <div>by {{ item.user_name }}</div>
          </div>
          <div>
            <b>${{ item.price }}</b>
          </div>
        </div>
      </div>
    </div>
    <div class="box_show_btn">
      <button class="show_btn" v-if="limit === 6" @click="limit = null">
        Show {{ collection.collectionModels.length - limit }} more
      </button>
      <button class="show_btn" v-else @click="limit = 6">Show less</button>
    </div>
    <div class="col_other">Other collections like this one</div>
    <div class="row">
      <div class="col s4" v-for="item in computeOthCol" v-bind:key="item">
        <img
          class="col_img"
          :src="'http://95.179.188.38/' + item.image"
          alt="collection_image"
        />
        <div class="col_data">
          <div>
            <div>{{ item.model_name }}</div>
          </div>
          <div style="display: flex">
            <div>
              <b>{{ item.price }} items</b>
            </div>
            <div style="margin-left: 20px">
              <b>&#10084; {{ item.id }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box_show_btn" style="margin: 0 auto 50px auto">
      <button
        class="show_btn"
        v-if="other_limit === 3"
        @click="other_limit = null"
      >
        Show all {{ collection.modelsData[0].length }}
      </button>
      <button class="show_btn" v-else @click="other_limit = 3">
        Show less
      </button>
    </div>
  </div>
</template>

<script>
import M from "materialize-css";
import MySelect from "./components/MySelect.vue";

export default {
  name: "App",
  components: { MySelect },
  data() {
    return {
      collection: {
        collectionData: {},
        collectionModels: [],
        collectionImages: [],
        modelsData: [[], []],
      },
      searchQuery: "",
      selectedSort: "",
      sortOptions: [{ value: "model_name", name: "По имени" }],
      limit: 6,
      other_limit: 3,
    };
  },
  mounted() {
    this.fetchData();
    M.AutoInit();
  },
  computed: {
    computeOthCol() {
      return this.other_limit
        ? this.collection.modelsData[0].slice(0, this.other_limit)
        : this.collection.modelsData[0];
    },
    computedObj() {
      return this.limit
        ? this.collection.collectionModels.slice(0, this.limit)
        : this.collection.collectionModels;
    },
    sortedPosts() {
      return [...this.computedObj].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.model_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    fetchData() {
      fetch("http://95.179.188.38/api/edit-collection/1")
        .then((response) => response.json())
        .then((value) => (this.collection = value.data));
    },
  },
};
</script>

<style></style>
