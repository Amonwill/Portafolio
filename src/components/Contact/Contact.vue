<template>
  <section id="contact" class="contact-section">
    <div class="section-header">
      <h1 class="main-title">Contact with me</h1>
      <p class="contact-subtitle">
        Do you have a project in mind or are you looking for a technical collaboration?
      </p>
    </div>


    <div class="contact-container always-glow">
      <div class="contact-grid">
        <div class="contact-info">
          
          <div class="info-item-large">
            <div class="icon-box-glow">
              <i class="fas fa-envelope-open-text"></i>
            </div>
            <div class="text-group">
              <h4>Email</h4>
              <p>wcruzhernandez59@gmail.com</p> </div>
          </div>

          <div class="info-item-large">
            <div class="icon-box-glow">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="text-group">
              <h4>Location</h4>
              <p>CDMX, Mexico</p> </div>
          </div>
          
          <div class="social-links-large">
            <a href="https://www.linkedin.com/in/william-cruz-hernandez-7942a6187" target="_blank" class="social-btn">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/Amonwill" target="_blank" class="social-btn">
              <i class="fab fa-github"></i> </a>
          </div>
        </div>

        <div class="contact-form-wrapper">
          <form @submit.prevent="handleSend" class="contact-form">
            <div class="input-group">
              <input v-model="form.name" type="text" placeholder="Full Name" required />
            </div>
            <div class="input-group">
              <input v-model="form.email" type="email" placeholder="Email Address" required />
            </div>
            <div class="input-group">
              <input v-model="form.subject" type="text" placeholder="Subject" required />
            </div>
            <div class="input-group">
              <textarea v-model="form.message" rows="5" placeholder="Tell me about the project..." required></textarea>
            </div>

            <button type="submit" class="cv-btn cv-btn-primary" :disabled="loading">
              <span v-if="!loading"> Send Message <i class="fas fa-paper-plane"></i></span>
              <span v-else>Send... <i class="fas fa-spinner fa-spin"></i></span>
            </button>

            <p v-if="statusMsg" :class="['status-note', statusType]">{{ statusMsg }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" src="./Contact.ts" />
<style scoped src="./Contact.css" />