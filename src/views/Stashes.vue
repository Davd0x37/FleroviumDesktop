<template>
  <div>
    <Service
      title="Spotify"
      logo_icon="la-spotify"
      :data="[
        {
          label: 'asd',
          detail: 'omg',
          important: true,
          color: '#1db954'
        },
        {
          label: 'asd',
          detail: 'omg',
          important: true,
          color: '#1db954'
        },
        {
          label: 'asd',
          detail: 'omg',
          important: true,
          color: '#1db954'
        },
        {
          label: 'asd',
          detail: 'omg',
          important: true,
          color: '#1db954'
        },
        {
          label: 'asd',
          detail: 'omg',
          important: true,
          color: '#1db954'
        },
        {
          label: 'asd',
          detail: 'omg',
          important: true,
          color: '#1db954'
        }
      ]"
      important="red"
    />
    <Service
      title="Paypal"
      logo_icon="la-paypal"
      :data="[
        {
          label: 'asd',
          detail: 'omg',
          important: false,
          color: '#1db954'
        }
      ]"
      important="red"
    />
    <Service
      title="DigitalOcean"
      logo_icon="la-digital-ocean"
      :data="[
        {
          label: 'asd',
          detail: 'omg',
          important: false,
          color: '#1db954'
        }
      ]"
      important="red"
    />
    <Service
      title="Discord"
      logo_icon="la-discord"
      :data="[
        {
          label: 'asd',
          detail: 'omg',
          important: true,
          color: '#1db954'
        }
      ]"
      important="red"
    />
    <!-- <article class="service">
      <div class="service__logo">
        <i class="lab la-3x la-spotify"></i>
      </div>
      <div class="service__name">Spotify</div>
      <div class="service__avatar">
        <img
          class="avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxLiXSwrZ6JQ4k45YDYgrGXlOMR7ywJifZlQ&usqp=CAU"
          alt="avatar"
        />
      </div>
      <div class="service__container">
        <div class="text">
          <p class="label">User Name</p>
          <p class="detail">Jon Doe</p>
        </div>
        <div class="text">
          <p class="label">Followers</p>
          <p class="detail important">3005030</p>
        </div>
        <div class="text">
          <p class="label">Expires</p>
          <p class="detail important">15.08.2020 (3 days)</p>
        </div>
        <div class="text">
          <p class="label">Account Type</p>
          <p class="detail important">Premium</p>
        </div>
        <div class="text">
          <p class="label">Email</p>
          <p class="detail">jondoe@mail.com</p>
        </div>
        <div class="text">
          <p class="label">Country</p>
          <p class="detail">Poland</p>
        </div>
        <div class="text">
          <p class="label">Albums</p>
          <p class="detail important">1500</p>
        </div>
      </div>
    </article>

    <article class="service">
      <div class="service__logo" style="color: #0d96d9;">
        <i class="lab la-3x la-paypal"></i>
      </div>
      <div class="service__name">Paypal</div>
      <div class="service__avatar">
        <img
          class="avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxLiXSwrZ6JQ4k45YDYgrGXlOMR7ywJifZlQ&usqp=CAU"
          alt="avatar"
        />
      </div>
      <div class="service__container">
        <div class="text">
          <p class="label">User Name</p>
          <p class="detail">Jon Doe</p>
        </div>
        <div class="text">
          <p class="label">Followers</p>
          <p class="detail important">3005030</p>
        </div>
        <div class="text">
          <p class="label">Balance</p>
          <p class="detail important">$20.00</p>
        </div>
        <div class="text">
          <p class="label">Account Type</p>
          <p class="detail important">Personal</p>
        </div>
        <div class="text">
          <p class="label">Email</p>
          <p class="detail">jondoe@mail.com</p>
        </div>
        <div class="text">
          <p class="label">Country</p>
          <p class="detail">Poland</p>
        </div>
      </div>
    </article>

    <article class="service">
      <div class="service__logo" style="color: #0080ff;">
        <i class="lab la-3x la-digital-ocean"></i>
      </div>
      <div class="service__name">DigitalOcean</div>
      <div class="service__avatar">
        <img
          class="avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxLiXSwrZ6JQ4k45YDYgrGXlOMR7ywJifZlQ&usqp=CAU"
          alt="avatar"
        />
      </div>
      <div class="service__container">
        <div class="text">
          <p class="label">User Name</p>
          <p class="detail">Jon Doe</p>
        </div>
        <div class="text">
          <p class="label">Balance</p>
          <p class="detail important">$20.00</p>
        </div>
        <div class="text">
          <p class="label">Bills</p>
          <p class="detail important">$0.00</p>
        </div>
        <div class="text">
          <p class="label">Droplets</p>
          <p class="detail">1</p>
        </div>
        <div class="text">
          <p class="label">Account Type</p>
          <p class="detail">Personal</p>
        </div>
        <div class="text">
          <p class="label">Country</p>
          <p class="detail">Poland</p>
        </div>
      </div>
    </article>

    <article class="service">
      <div class="service__logo" style="color: #6b80ca;">
        <i class="lab la-3x la-discord"></i>
      </div>
      <div class="service__name">Discord</div>
      <div class="service__avatar">
        <img
          class="avatar"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxLiXSwrZ6JQ4k45YDYgrGXlOMR7ywJifZlQ&usqp=CAU"
          alt="avatar"
        />
      </div>
      <div class="service__container">
        <div class="text">
          <p class="label">User Name</p>
          <p class="detail">Jon Doe</p>
        </div>
        <div class="text">
          <p class="label">Followers</p>
          <p class="detail important">3005030</p>
        </div>
        <div class="text">
          <p class="label">Expires</p>
          <p class="detail important">15.08.2020 (3 days)</p>
        </div>
        <div class="text">
          <p class="label">Account Type</p>
          <p class="detail important">Premium</p>
        </div>
        <div class="text">
          <p class="label">Email</p>
          <p class="detail">jondoe@mail.com</p>
        </div>
        <div class="text">
          <p class="label">Country</p>
          <p class="detail">Poland</p>
        </div>
        <div class="text">
          <p class="label">Albums</p>
          <p class="detail important">1500</p>
        </div>
      </div>
    </article>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Service from "@/components/Service.vue";

@Component({
  components: {
    Service
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.service {
  display: grid;
  background-color: $header;
  border-radius: 25px;
  grid-template-rows: 130px 240px;
  grid-template-columns: 92px 328px 130px;
  grid-template-areas:
    "logo name avatar"
    "container container container";
  color: $primary;
  font-weight: bold;
  margin: 20px;

  &__logo,
  &__name,
  &__avatar {
    align-self: center;
    justify-self: center;
  }

  &__logo {
    grid-area: logo;
    color: $important;
  }
  &__name {
    grid-area: name;
    font-size: 1.7rem;
    justify-self: left;
  }
  &__avatar {
    grid-area: avatar;

    .avatar {
      width: 70px;
      object-fit: cover;
      height: 70px;
      border-radius: 100%;
    }
  }
  &__container {
    grid-area: container;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .text {
      padding: 7px 25px;
      .label {
        color: $medium;
        font-size: 0.8rem;
        margin: 0;
        font-weight: normal;
      }
      .detail {
        margin: 0;
        font-size: 1.1rem;
      }
    }
  }
}
</style>
