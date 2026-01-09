<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';
	
	let isVisible = false;
	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};
	let isSubmitting = false;
	let submitSuccess = false;
	
	onMount(() => {
		setTimeout(() => {
			isVisible = true;
		}, 100);
	});
	
	async function handleSubmit() {
		isSubmitting = true;
		
		// Simulate form submission
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		console.log('Form submitted:', formData);
		submitSuccess = true;
		isSubmitting = false;
		
		// Reset form after success
		setTimeout(() => {
			formData = { name: '', email: '', subject: '', message: '' };
			submitSuccess = false;
		}, 3000);
	}
	
	function handleInputChange(field: keyof typeof formData, value: string) {
		formData[field] = value;
	}
</script>

<div class="contact-page">
	<section class="hero-section">
		<div class="container">
			<div class="hero-content" class:visible={isVisible}>
				<h1 class="page-title">{t('contact.title')}</h1>
				<p class="page-subtitle">
					{t('contact.subtitle')}
				</p>
			</div>
		</div>
	</section>

	<section class="contact-section">
		<div class="container">
			<div class="contact-content" class:visible={isVisible}>
				<div class="contact-grid">
					<div class="contact-info">
						<h2 class="section-title">Contact Information</h2>
						
						<div class="info-cards">
							<div class="info-card">
								<div class="info-icon">📧</div>
								<div class="info-content">
									<h3>{t('contact.email')}</h3>
									<p>saraylo@yandex.ru</p>
								</div>
							</div>
							
							<div class="info-card">
								<div class="info-icon">🌐</div>
								<div class="info-content">
									<h3>{t('contact.website')}</h3>
									<p>qoder.dev</p>
								</div>
							</div>
							
							<div class="info-card">
								<div class="info-icon">📍</div>
								<div class="info-content">
									<h3>{t('contact.location')}</h3>
									<p>{t('Russia - best country of World')}</p>
								</div>
							</div>
							
							<div class="info-card">
								<div class="info-icon">🕒</div>
								<div class="info-content">
									<h3>{t('contact.response_time')}</h3>
									<p>{t('contact.response_within_24')}</p>
								</div>
							</div>
						</div>
						
						<div class="social-links">
							<h3>{t('contact.connect_with_us')}</h3>
							<div class="social-icons">
								<a href="#" class="social-link">GitHub</a>
								<a href="#" class="social-link">Twitter</a>
								<a href="#" class="social-link">LinkedIn</a>
							</div>
						</div>
					</div>
					
					<div class="contact-form-container">
						<h2 class="section-title">{t('contact.send_message')}</h2>
						
						<form class="contact-form" on:submit|preventDefault={handleSubmit}>
							<div class="form-group">
								<label for="name">{t('contact.name')}</label>
								<input 
									id="name"
									type="text" 
									placeholder="{t('contact.name_placeholder')}"
									bind:value={formData.name}
									required
									class="form-input"
								/>
							</div>
							
							<div class="form-group">
								<label for="email">Email</label>
								<input 
									id="email"
									type="email" 
									placeholder="your.email@example.com"
									bind:value={formData.email}
									required
									class="form-input"
								/>
							</div>
							
							<div class="form-group">
								<label for="subject">{t('contact.subject')}</label>
								<input 
									id="subject"
									type="text" 
									placeholder="{t('contact.subject_placeholder')}"
									bind:value={formData.subject}
									required
									class="form-input"
								/>
							</div>
							
							<div class="form-group">
								<label for="message">{t('contact.message')}</label>
								<textarea 
									id="message"
									placeholder="{t('contact.message_placeholder')}"
									bind:value={formData.message}
									required
									rows="6"
									class="form-input"
								></textarea>
							</div>
							
							<button 
								type="submit" 
								class="submit-button" 
								disabled={isSubmitting}
								class:loading={isSubmitting}
								class:success={submitSuccess}
							>
								{#if submitSuccess}
									{t('contact.success_message')}
								{:else if isSubmitting}
									{t('contact.sending')}
								{:else}
									{t('contact.send_button')}
								{/if}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="response-time-section">
		<div class="container">
			<div class="response-content" class:visible={isVisible}>
				<div class="response-card">
					<h2>What to Expect</h2>
					<div class="expectations">
						<div class="expectation-item">
							<span class="expectation-number">1</span>
							<div class="expectation-text">
								<h3>Quick Acknowledgment</h3>
								<p>We'll confirm receipt of your message within 2 hours</p>
							</div>
						</div>
						
						<div class="expectation-item">
							<span class="expectation-number">2</span>
							<div class="expectation-text">
								<h3>Detailed Response</h3>
								<p>Comprehensive reply with next steps within 24 hours</p>
							</div>
						</div>
						
						<div class="expectation-item">
							<span class="expectation-number">3</span>
							<div class="expectation-text">
								<h3>Project Discussion</h3>
								<p>Schedule a call to discuss requirements and timeline</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.contact-page {
		animation: fadeIn 0.8s ease-out;
	}

	.hero-section {
		padding: var(--spacing-3xl) 0 var(--spacing-xl);
	}

	.hero-content {
		text-align: center;
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
	}

	.hero-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.page-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		margin-bottom: var(--spacing-lg);
		font-weight: 800;
	}

	.highlight {
		background: linear-gradient(135deg, var(--color-lime) 0%, var(--color-fuchsia) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.page-subtitle {
		font-size: var(--text-xl);
		color: var(--color-warm-text-light);
		max-width: 700px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.contact-section {
		padding: var(--spacing-3xl) 0;
	}

	.contact-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.1s;
	}

	.contact-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--spacing-3xl);
	}

	.section-title {
		font-size: var(--text-2xl);
		font-weight: 700;
		margin-bottom: var(--spacing-xl);
		color: var(--color-gray-900);
	}

	.info-cards {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-2xl);
	}

	.info-card {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-md);
		padding: var(--spacing-lg);
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		border: 1px solid var(--glass-border);
		transition: all var(--transition-fast);
	}

	.info-card:hover {
		transform: translateX(5px);
		border-color: var(--color-lime);
	}

	.info-icon {
		font-size: 1.5rem;
		min-width: 40px;
	}

	.info-content h3 {
		font-size: var(--text-lg);
		font-weight: 600;
		margin-bottom: var(--spacing-xs);
		color: var(--color-warm-text);
	}

	.info-content p {
		color: var(--color-warm-text-light);
		font-family: var(--font-mono);
	}

	.social-links h3 {
		font-size: var(--text-lg);
		margin-bottom: var(--spacing-md);
		color: var(--color-gray-900);
	}

	.social-icons {
		display: flex;
		gap: var(--spacing-md);
		flex-wrap: wrap;
	}

	.social-link {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-warm-text-light);
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		border: 1px solid var(--glass-border);
		transition: all var(--transition-fast);
	}

	.social-link:hover {
		color: var(--color-lime);
		background: rgba(132, 204, 22, 0.1);
		border-color: var(--color-lime);
		transform: translateY(-2px);
	}

	.contact-form {
		background: white;
		padding: var(--spacing-2xl);
		border-radius: 20px;
		box-shadow: var(--shadow-soft);
		border: 1px solid var(--color-gray-100);
	}

	.form-group {
		margin-bottom: var(--spacing-lg);
	}

	.form-group label {
		display: block;
		font-family: var(--font-mono);
		font-weight: 600;
		margin-bottom: var(--spacing-sm);
		color: var(--color-gray-700);
	}

	.form-input {
		width: 100%;
		padding: var(--spacing-md);
		border: 2px solid var(--color-gray-200);
		border-radius: 12px;
		font-family: var(--font-ui);
		font-size: var(--text-base);
		transition: all var(--transition-fast);
		background: var(--color-gray-50);
	}

	.form-input:focus {
		outline: none;
		border-color: var(--color-lime);
		background: white;
		box-shadow: 0 0 0 3px rgba(163, 230, 53, 0.1);
	}

	.form-input::placeholder {
		color: var(--color-gray-400);
	}

	.submit-button {
		width: 100%;
		padding: var(--spacing-md) var(--spacing-xl);
		background: linear-gradient(135deg, var(--color-lime) 0%, var(--color-peach) 100%);
		color: var(--color-gray-900);
		font-family: var(--font-mono);
		font-weight: 600;
		font-size: var(--text-base);
		border: none;
		border-radius: 12px;
		cursor: pointer;
		transition: all var(--transition-fast);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		position: relative;
		overflow: hidden;
	}

	.submit-button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: var(--glow-lime), 0 10px 20px rgba(163, 230, 53, 0.3);
	}

	.submit-button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	.submit-button.success {
		background: linear-gradient(135deg, var(--color-lime) 0%, var(--color-fuchsia) 100%);
	}

	.response-time-section {
		padding: var(--spacing-3xl) 0 var(--spacing-3xl);
		background: linear-gradient(to bottom, var(--color-warm-neutral), var(--color-warm-bg));
	}

	.response-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.2s;
	}

	.response-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.response-card {
		max-width: 800px;
		margin: 0 auto;
		background: white;
		padding: var(--spacing-2xl);
		border-radius: 24px;
		box-shadow: var(--shadow-soft);
		border: 1px solid var(--color-gray-100);
		text-align: center;
	}

	.response-card h2 {
		font-size: var(--text-2xl);
		margin-bottom: var(--spacing-xl);
		color: var(--color-gray-900);
	}

	.expectations {
		display: grid;
		gap: var(--spacing-xl);
		text-align: left;
	}

	.expectation-item {
		display: flex;
		gap: var(--spacing-lg);
		align-items: flex-start;
	}

	.expectation-number {
		font-family: var(--font-mono);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-lime);
		min-width: 40px;
	}

	.expectation-text h3 {
		font-size: var(--text-xl);
		margin-bottom: var(--spacing-xs);
		color: var(--color-warm-text);
	}

	.expectation-text p {
		color: var(--color-warm-text-light);
		line-height: 1.6;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 1024px) {
		.contact-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-xl);
		}
	}

	@media (max-width: 768px) {
		.contact-form {
			padding: var(--spacing-xl);
		}
		
		.expectation-item {
			flex-direction: column;
			text-align: center;
		}
		
		.expectation-number {
			align-self: center;
		}
	}
</style>