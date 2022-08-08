<template>
  <div class="footerContainer pb-3">
    <p class="thick"></p>
    <div class="d-md-flex justify-content-between align-items-center p-3 px-lg-5">
      <div class="aboutUs">
        <div class="my-3">
          <router-link to="#" class="text-white">About Us</router-link>
        </div>
        <div class="mb-3">
          <router-link :to="{name:'RoleModels'}" class="text-white">Role Models</router-link>
        </div>
        <div class="mb-3">
          <router-link :to="{name:'Mentors'}" class="text-white">Mentors</router-link>
        </div>
        <div class="mb-3">
          <router-link to="#" class="text-white">Blogs</router-link>
        </div>
      </div>
      <div class="contactSection">
        <div class="my-3 text-white">Contacts Us</div>
        <div class="mb-3 text-white">Email Address: superwoman@gmail.com</div>
        <div class="mb-3 text-white">Phone: 251948266629</div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="me-3">
          <a  href="https://www.facebook.com/eyilachew.lemma.9/" class="text-white fs-4 text-decoration-none"><i class="fab fa-facebook-square"></i></a>
        </div>
        <div class="me-3">
          <router-link to="#" class="text-white fs-4 text-decoration-none"><i class="fab fa-instagram-square"></i></router-link>
        </div>
        <div class="me-3">
          <a href="https://twitter.com/eyilachew_lema"  class="text-white fs-4 text-decoration-none"><i class="fab fa-twitter-square"></i></a>
        </div>
        <div class="me-3">
          <a href="https://www.linkedin.com/in/eyilachew-lemma-072485213/" class="text-white fs-4 text-decoration-none"><i class="fab fa-linkedin"></i></a>
        </div>
      </div>
    </div>
    <p class="thin"></p>
    <div class="text-center mt-2">
      <p class="text-white small">Designed and Developed by Merahi Technologies</p>
      <p class="text-white small">@{{ getYear()}}- Merahi Technologies</p>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    getYear(){
      return new Date().getFullYear()
    }
  },
};
</script>
<style scoped>
.footerContainer {
  background-color: #0f0e1c;
}
p {
  max-width: 100%;
}
.thick {
  padding: 1px;
  background-color: #f69f83;
}
.thin {
  padding: 0.5px;
  background-color: #f69f83;
}
.contactSection,
.aboutUs {
  text-align: left;
}
@media (max-width: 768px) {
  .aboutUs,
  .contactSection {
    text-align: center;
  }
}
</style>