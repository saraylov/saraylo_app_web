<script lang="ts">
	export const prerender = true;
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';
	
	let isVisible = false;
	let skills = [
		{ name: t('about.engineering_excellence'), level: 95 },
		{ name: t('about.user_first_design'), level: 88 },
		{ name: t('about.continuous_learning'), level: 92 },
		{ name: t('about.development_approach'), level: 85 }
	];
	
	let currentSkillIndex = 0;
	
	onMount(() => {
		setTimeout(() => {
			isVisible = true;
		}, 100);
		
		// Rotate skills showcase
		setInterval(() => {
			currentSkillIndex = (currentSkillIndex + 1) % skills.length;
		}, 3000);
	});
</script>

<div class="about-page">
	<section class="hero-section">
		<div class="container">
			<div class="hero-content" class:visible={isVisible}>
				<h1 class="page-title">{t('about.title')}</h1>
				<p class="page-subtitle">
					{t('about.subtitle')}
				</p>
			</div>
		</div>
	</section>

	<section class="story-section">
		<div class="container">
			<div class="story-content" class:visible={isVisible}>
				<div class="story-text">
					<h2 class="section-title">{t('about.our_story')}</h2>
					<p>
						{t('about.company_story')}
					</p>
					<p>
						{t('about.we_specialize')}
					</p>
				</div>
				
				<div class="philosophy-cards">
					<div class="philosophy-card">
						<h3>{t('about.engineering_excellence')}</h3>
						<p>{t('about.engineering_desc')}</p>
					</div>
					<div class="philosophy-card">
						<h3>{t('about.user_first_design')}</h3>
						<p>{t('about.user_first_desc')}</p>
					</div>
					<div class="philosophy-card">
						<h3>{t('about.continuous_learning')}</h3>
						<p>{t('about.learning_desc')}</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="approach-section">
		<div class="container">
			<div class="approach-content" class:visible={isVisible}>
				<h2 class="section-title">{t('about.development_approach')}</h2>
									
				<div class="approach-steps">
					<div class="step">
						<div class="step-number">01</div>
						<div class="step-content">
							<h3>{t('about.discovery_research')}</h3>
							<p>{t('about.discovery_desc')}</p>
						</div>
					</div>
										
					<div class="step">
						<div class="step-number">02</div>
						<div class="step-content">
							<h3>{t('about.architecture_planning')}</h3>
							<p>{t('about.architecture_desc')}</p>
						</div>
					</div>
										
					<div class="step">
						<div class="step-number">03</div>
						<div class="step-content">
							<h3>{t('about.implementation')}</h3>
							<p>{t('about.implementation_desc')}</p>
						</div>
					</div>
										
					<div class="step">
						<div class="step-number">04</div>
						<div class="step-content">
							<h3>{t('about.refinement_launch')}</h3>
							<p>{t('about.refinement_desc')}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="skills-section">
		<div class="container">
			<div class="skills-content" class:visible={isVisible}>
				<h2 class="section-title">{t('about.core_competencies')}</h2>
				
				<div class="skills-showcase">
					<div class="current-skill">
						<h3>{skills[currentSkillIndex].name}</h3>
						<div class="skill-bar">
							<div 
								class="skill-progress" 
								style="width: {skills[currentSkillIndex].level}%"
							></div>
						</div>
						<span class="skill-percentage">{skills[currentSkillIndex].level}%</span>
					</div>
					
					<div class="skills-grid">
						{#each skills as skill}
							<div class="skill-item">
								<span class="skill-name">{skill.name}</span>
								<span class="skill-value">{skill.level}%</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="tech-stack-section">
		<div class="container">
			<div class="tech-content" class:visible={isVisible}>
				<h2 class="section-title">{t('about.technology_stack')}</h2>
				
				<div class="tech-categories">
					<div class="tech-category">
						<h3>Frontend</h3>
						<div class="tech-tags">
							<span class="tech-tag">Svelte/SvelteKit</span>
							<span class="tech-tag">React/Vue</span>
							<span class="tech-tag">TypeScript</span>
							<span class="tech-tag">Tailwind CSS</span>
						</div>
					</div>
					
					<div class="tech-category">
						<h3>Backend</h3>
						<div class="tech-tags">
							<span class="tech-tag">Node.js</span>
							<span class="tech-tag">Python</span>
							<span class="tech-tag">Go</span>
							<span class="tech-tag">PostgreSQL</span>
						</div>
					</div>
					
					<div class="tech-category">
						<h3>Mobile/Desktop</h3>
						<div class="tech-tags">
							<span class="tech-tag">React Native</span>
							<span class="tech-tag">Flutter</span>
							<span class="tech-tag">Electron</span>
							<span class="tech-tag">Tauri</span>
						</div>
					</div>
					
					<div class="tech-category">
						<h3>Infrastructure</h3>
						<div class="tech-tags">
							<span class="tech-tag">AWS/Docker</span>
							<span class="tech-tag">CI/CD</span>
							<span class="tech-tag">Testing</span>
							<span class="tech-tag">Monitoring</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.about-page {
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

	.story-section {
		padding: var(--spacing-3xl) 0;
		background: linear-gradient(to bottom, var(--color-warm-bg), var(--color-warm-neutral));
	}

	.story-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.1s;
	}

	.story-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.story-text {
		max-width: 800px;
		margin: 0 auto var(--spacing-3xl);
	}

	.story-text p {
		font-size: var(--text-lg);
		color: var(--color-warm-text);
		line-height: 1.7;
		margin-bottom: var(--spacing-lg);
	}

	.philosophy-cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-lg);
	}

	.philosophy-card {
		background: white;
		padding: var(--spacing-xl);
		border-radius: 20px;
		box-shadow: var(--shadow-soft);
		border: 1px solid var(--color-gray-100);
		text-align: center;
		transition: all var(--transition-normal);
	}

	.philosophy-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow-md);
		border-color: var(--color-lime);
	}

	.philosophy-card h3 {
		font-size: var(--text-xl);
		margin-bottom: var(--spacing-md);
		color: var(--color-warm-text);
	}

	.philosophy-card p {
		color: var(--color-warm-text-light);
		line-height: 1.6;
		font-size: var(--text-base);
	}

	.approach-section {
		padding: var(--spacing-3xl) 0;
		background: var(--color-warm-bg-alt);
	}

	.approach-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.2s;
	}

	.approach-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.approach-steps {
		display: grid;
		gap: var(--spacing-xl);
		max-width: 800px;
		margin: 0 auto;
	}

	.step {
		display: flex;
		gap: var(--spacing-lg);
		align-items: flex-start;
		padding: var(--spacing-xl);
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		border: 1px solid var(--glass-border);
		transition: all var(--transition-fast);
	}

	.step:hover {
		transform: translateX(10px);
		border-color: var(--color-lime);
	}

	.step-number {
		font-family: var(--font-mono);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-lime);
		min-width: 60px;
	}

	.step-content h3 {
		font-size: var(--text-xl);
		margin-bottom: var(--spacing-sm);
		color: var(--color-warm-text);
	}

	.step-content p {
		color: var(--color-warm-text-light);
		line-height: 1.6;
	}

	.skills-section {
		padding: var(--spacing-3xl) 0;
		background: linear-gradient(to bottom, var(--color-warm-neutral), var(--color-warm-bg));
	}

	.skills-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.3s;
	}

	.skills-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.skills-showcase {
		max-width: 600px;
		margin: 0 auto;
	}

	.current-skill {
		text-align: center;
		margin-bottom: var(--spacing-2xl);
		padding: var(--spacing-xl);
		background: white;
		border-radius: 20px;
		box-shadow: var(--shadow-soft);
	}

	.current-skill h3 {
		font-size: var(--text-2xl);
		margin-bottom: var(--spacing-lg);
		color: var(--color-gray-900);
	}

	.skill-bar {
		height: 12px;
		background: var(--color-gray-200);
		border-radius: 6px;
		overflow: hidden;
		margin-bottom: var(--spacing-sm);
	}

	.skill-progress {
		height: 100%;
		background: linear-gradient(90deg, var(--color-lime), var(--color-fuchsia));
		border-radius: 6px;
		transition: width 1s cubic-bezier(0.22, 0.61, 0.36, 1);
	}

	.skill-percentage {
		font-family: var(--font-mono);
		font-weight: 600;
		color: var(--color-gray-700);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);
	}

	.skill-item {
		display: flex;
		justify-content: space-between;
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border-radius: 12px;
		border: 1px solid var(--glass-border);
	}

	.skill-name {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-warm-text);
	}

	.skill-value {
		font-weight: 600;
		color: var(--color-lime);
	}

	.tech-stack-section {
		padding: var(--spacing-3xl) 0 var(--spacing-3xl);
		background: var(--color-warm-bg-alt);
	}

	.tech-content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.4s;
	}

	.tech-content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.tech-categories {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--spacing-xl);
	}

	.tech-category {
		background: white;
		padding: var(--spacing-xl);
		border-radius: 20px;
		box-shadow: var(--shadow-soft);
		border: 1px solid var(--color-gray-100);
	}

	.tech-category h3 {
		font-size: var(--text-xl);
		margin-bottom: var(--spacing-lg);
		color: var(--color-warm-text);
		text-align: center;
	}

	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-sm);
		justify-content: center;
	}

	.tech-tag {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		background: linear-gradient(135deg, var(--color-gray-100) 0%, var(--color-gray-200) 100%);
		color: var(--color-gray-700);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: 20px;
		transition: all var(--transition-fast);
	}

	.tech-tag:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-soft);
		background: linear-gradient(135deg, var(--color-lime) 0%, var(--color-peach) 100%);
		color: var(--color-gray-900);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@media (max-width: 768px) {
		.philosophy-cards {
			grid-template-columns: 1fr;
		}
		
		.step {
			flex-direction: column;
			text-align: center;
		}
		
		.skills-grid {
			grid-template-columns: 1fr;
		}
		
		.tech-categories {
			grid-template-columns: 1fr;
		}
	}
</style>