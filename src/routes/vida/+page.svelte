<script>
	import DemoMD from '#lib/components/DemoMD.svelte';
	import ProjectRoot from '#lib/components/ProjectRoot.svelte';
	import QuickLink from '#lib/components/QuickLink.svelte';
</script>

{#snippet left()}
	<div id="pane-container">
		<div class="pane left-pane">
			<h1>Início: Vida</h1>

			<h5>Vida</h5>
			<p><QuickLink href="/vida/eu">Eu</QuickLink></p>
			<p><QuickLink href="/vida/curriculo">Currículo</QuickLink></p>
			<p><QuickLink href="/vida/registro">Registro</QuickLink></p>
			<p><QuickLink href="/vida/plano-de-estudos">Plano de Estudos</QuickLink></p>
			<p><QuickLink href="/vida/cartoes-de-visita">Cartões de Visita</QuickLink></p>

			<h5>Magia</h5>
			<p><QuickLink href="/vida/sonhos">Sonhos</QuickLink></p>
			<p><QuickLink href="/vida/gratidoes">Gratidões</QuickLink></p>
			<p><QuickLink href="/vida/taro-pessoal">Tarô Pessoal</QuickLink></p>
			<p><QuickLink href="/vida/recapitulacao">Recapitulação</QuickLink></p>
			<p><QuickLink href="/vida/correspondencias">Correspondências</QuickLink></p>
			<p><QuickLink href="/vida/livro-das-sombras">Livro das Sombras</QuickLink></p>
			<p><QuickLink href="/vida/catalogo-de-emocoes">Catálogo de Emoções</QuickLink></p>
			<p><QuickLink href="/vida/sigilos-e-servidores">Sigilos e Servidores</QuickLink></p>

			<h5>Favoritos</h5>
			<p><QuickLink href="/vida/fotos">Fotos</QuickLink></p>
			<p><QuickLink href="/vida/favoritos">Favoritos</QuickLink></p>
			<p><QuickLink href="/vida/estante">Estante</QuickLink></p>
			<p><QuickLink href="/vida/playlists">Playlists</QuickLink></p>

			<h5>Outros</h5>
		</div>
		<div class="pane middle-pane"></div>
		<div class="pane right-pane"></div>
	</div>
{/snippet}

{#snippet topRight()}Top Right Content{/snippet}
{#snippet bottomRight()}Bottom Right Content{/snippet}
{#snippet middle()}<DemoMD />{/snippet}

<ProjectRoot {left} {topRight} {bottomRight} {middle} />
