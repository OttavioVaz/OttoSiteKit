<script lang="ts">
	import curriculo from '#lib/data/curriculo.json';

	const technologyGroups = [
		{ name: 'Design', items: curriculo.tecnologias.design },
		{ name: 'Linguagens', items: curriculo.tecnologias.linguagens },
		{ name: 'Desenvolvimento', items: curriculo.tecnologias.desenvolvimento },
		{ name: 'Produtividade', items: curriculo.tecnologias.produtividade }
	] satisfies { name: string; items: string[] }[];

	const phoneHref = `tel:${curriculo.contato.telefone.replace(/[^\d+]/g, '')}`;
</script>

<main>
	<header>
		<h1>{curriculo.nome}</h1>
		<address>
			<p><a href="mailto:{curriculo.contato.email}">{curriculo.contato.email}</a></p>
			<p><a href={phoneHref}>{curriculo.contato.telefone}</a></p>
		</address>
	</header>

	<section aria-labelledby="resumo-heading">
		<h2 id="resumo-heading">Resumo</h2>
		<section aria-labelledby="perfil-heading">
			<h3 id="perfil-heading">Perfil</h3>
			<p>{curriculo.resumo.perfil}</p>
		</section>
		<section aria-labelledby="destaques-heading">
			<h3 id="destaques-heading">Destaques</h3>
			<p>{curriculo.resumo.destaques}</p>
		</section>
		<section aria-labelledby="objetivo-heading">
			<h3 id="objetivo-heading">Objetivo</h3>
			<p>{curriculo.resumo.objetivo}</p>
		</section>
	</section>

	<section aria-labelledby="tecnologias-heading">
		<h2 id="tecnologias-heading">Tecnologias</h2>
		{#each technologyGroups as group (group.name)}
			<section aria-labelledby="technology-{group.name}">
				<h3 id="technology-{group.name}">{group.name}</h3>
				<ul>
					{#each group.items as technology (technology)}
						<li>{technology}</li>
					{/each}
				</ul>
			</section>
		{/each}
	</section>

	<section aria-labelledby="experiencias-heading">
		<h2 id="experiencias-heading">Experiência</h2>
		{#each curriculo.experiencias as experiencia (experiencia.empresa)}
			<article>
				<h3>{experiencia.empresa}</h3>
				<p>
					<strong>Período:</strong>
					{experiencia.periodo.inicio} – {experiencia.periodo.fim}
				</p>
				<h4>Cargos</h4>
				<ul>
					{#each experiencia.cargos as cargo (cargo)}
						<li>{cargo}</li>
					{/each}
				</ul>
				<p>{experiencia.descricao}</p>
			</article>
		{/each}
	</section>
</main>
