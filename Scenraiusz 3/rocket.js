(async () => {
	try {
		const items = await fetchRockets()
		const main = document.querySelector('body > main')

		main.innerHTML = items
			.map(it => `
				<article class="card">
					<header style="background-image: url(${it.images[0]})"></header>
					<main>
						<h1>${it.name}</h1>
						<p>${it.description}</p>
						
						<table>
							<tbody>
								<tr>
									<td>Wysokość</td>
									<td>${it.height} m</td>
								</tr>
								<tr>
									<td>Szerokość</td>
									<td>${it.diameter} m</td>
								</tr>
								<tr>
									<td>Masa</td>
									<td>${it.mass} kg</td>
								</tr>
								<tr>
									<td>Pierwszy lot</td>
									<td>${it.firstFlight} </td>
								</tr>
								<tr>
									<td>Koszt wystrzału</td>
									<td>$ ${it.costPerLaunch} </td>
								</tr>
								<tr>
									<td>Aktywny</td>
									<td>${it.inUse} </td>
								</tr>
								<tr>
									<td>Siła ciągu na poziomie morza</td>
									<td>${it.engines.thrustSeaLevel} </td>
								</tr>
								<tr>
									<td>siła ciągu w próżni</td>
									<td>${it.engines.thrustVacuum} </td>
								</tr>
								<tr>
									<td>Typ silnika</td>
									<td>${it.engines.type} </td>
								</tr>
								<tr>
									<td>Stosunek ciągu do masy</td>
									<td>${it.engines.thrustToWeight} </td>
								</tr>
							</tbody>
						</table>
					</main>
				</article>
			`)
			.join('')
	}
	catch(err) {
		throw err
	}
})()