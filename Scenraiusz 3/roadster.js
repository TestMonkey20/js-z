(async () => {
	try {
		const items = await fetchRoadster()

		// Array.prototype.slice can now convert certain host objects 
		// (e.g. NodeList’s) to arrays — something that majority of 
		// modern browsers have been able to do for quite a while.
		// --- Stack Overflow person

		const setters = Array.prototype.slice
			.call(document.querySelectorAll('body > main > .table-wrapper > table > tbody > tr > td'))
			.map(el => html => el.innerHTML = html)

		const [setLaunchDate, setEarthDistance, setMarsDistance] = setters
		setLaunchDate(items.launchDate)
		setEarthDistance(Math.round(items.earthDistance/1000000) + "mln km")
		setMarsDistance(Math.round(items.marsDistance/1000000) + "mln km")
			
		descriptionHandle = document.querySelector('body > main > p')
		descriptionHandle.innerHTML = items.description

		imagesHandle = document.querySelector('body > main > .images')
		imagesHandle.innerHTML = items.images
			.map(img => `<img src="${img}"/>`)
			.join('')

	}
	catch(err) {
		throw err
	}
})()