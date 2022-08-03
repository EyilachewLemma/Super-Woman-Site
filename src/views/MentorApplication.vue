<template>
    <div>
      <p>Please fill the following forms carefully to be a mentor</p> 
      <div class="mb-3">
  <label for="fname" class="form-label">First Name</label>
  <input type="text" class="form-control" id="fname">
</div> 
  <div class="mb-3">
  <label for="lname" class="form-label">Last Name</label>
  <input type="text" class="form-control" id="lname">
</div> 
  <div class="mb-3">
  <label for="phoneno" class="form-label">Phone Number</label>
  <input type="tel" class="form-control" id="phoneno">
</div> 
  <div class="mb-3">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control" id="email">
</div> 
<div class="mb-3">
  <label for="personality" class="form-label">Describe your Strangth in short</label>
  <textarea class="form-control" id="personality" rows="3"></textarea>
</div>
    </div>
</template>
<script>
export default {
    mentor:{}
}
</script>