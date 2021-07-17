(async () => {
	try {
		const items = await fetchStarlink()
		const params = new URLSearchParams(document.location.search)
		const curPage = Number.parseInt(params.get('p')) || 0
		const pageSize = 10
		const maxPagination = 5
		const pageCount = Math.ceil(items.length/pageSize)
		const table = document.querySelector('table.starlink-table > tbody')
		table.innerHTML = items
			.map((it, n) => ({n: n+1,...it}))
			.slice(pageSize*curPage, pageSize*(curPage+1))
			.map(it => `
				<tr>
					<td>${it.n}</td>
					<td>${it.id}</td>
					<td>${it.name}</td>
					<td>${it.launchDate}</td>
				</tr>
			`)
			.join('')

		const pagination = document.querySelector('footer > .pagination')	
		pagination.innerHTML = [...Array(maxPagination*2 + 1).keys()]
			.map(x => curPage - maxPagination + x)
			.filter(x => x >= 0 && x < pageCount)
			.map(pageNo => `
				<a 
					${ curPage === pageNo ? `class="selected"` : ''} 
					href="?p=${pageNo}"
				>
					${pageNo + 1}
				</a>
			`)
			.join('')
		
	}
	catch(err) {
		throw err
	}
})()

