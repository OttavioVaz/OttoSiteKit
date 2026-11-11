<script>
	import DemoMD from '#lib/components/DemoMD.svelte';
	import ProjectRoot from '#lib/components/ProjectRoot.svelte';
</script>

{#snippet left()}
	<div id="pane-container">
		<div class="pane left-pane">
			<h1>Início: Vida</h1>

			<h5>Vida</h5>
			<p><a href="/vida/eu">Eu</a></p>
			<p><a href="/vida/curriculo">Currículo</a></p>
			<p><a href="/vida/registro">Registro</a></p>
			<p><a href="/vida/plano-de-estudos">Plano de Estudos</a></p>
			<p><a href="/vida/cartoes-de-visita">Cartões de Visita</a></p>
			
			<h5>Magia</h5>
			<p><a href="/vida/sonhos">Sonhos</a></p>
			<p><a href="/vida/gratidoes">Gratidões</a></p>
			<p><a href="/vida/taro-pessoal">Tarô Pessoal</a></p>
			<p><a href="/vida/recapitulacao">Recapitulação</a></p>
			<p><a href="/vida/correspondencias">Correspondências</a></p>
			<p><a href="/vida/livro-das-sombras">Livro das Sombras</a></p>
			<p><a href="/vida/catalogo-de-emocoes">Catálogo de Emoções</a></p>
			<p><a href="/vida/sigilos-e-servidores">Sigilos e Servidores</a></p>

			<h5>Favoritos</h5>
			<p><a href="/vida/fotos">Fotos</a></p>
			<p><a href="/vida/favoritos">Favoritos</a></p>
			<p><a href="/vida/estante">Estante</a></p>
			<p><a href="/vida/playlists">Playlists</a></p>

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
