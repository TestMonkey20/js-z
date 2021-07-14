'use strict'

const starlinkSatelitesURL = 'https://api.spacexdata.com/v4/starlink'
const rocketsURL = 'https://api.spacexdata.com/v4/rockets'
const roadsterURL = 'https://api.spacexdata.com/v4/roadster'

const fetchStarlink = async () => {
	const data = await fetch(starlinkSatelitesURL, { method: 'GET' })
	const starlinks = await data.json()
	const mapper = (satelite) => {
		return {
			id: satelite.spaceTrack.OBJECT_ID,
			name: satelite.spaceTrack.OBJECT_NAME,
			launchDate: satelite.spaceTrack.LAUNCH_DATE,
		}
	}
	return starlinks.map(mapper)
}

const fetchRockets = async () => {
	const data = await fetch(rocketsURL, { method: 'GET' })
	const rockets = await data.json()
	const mapper = (rocket) => {
		return {
			name: rocket.name,
			height: rocket.height.meters,
			diameter: rocket.diameter.meters,
			mass: rocket.mass.kg,
			images: rocket.flickr_images,
			description: rocket.description,
			firstFlight: rocket.first_flight,
			costPerLaunch: rocket.cost_per_launch,
			inUse: rocket.activate,
			engines: {
				thrustSeaLevel: rocket.engines.thrust_sea_level,
				thrustVacuum: rocket.engines.thrust_vacuum,
				type: rocket.engines.type,
				thrustToWeight: rocket.engines.thurst_to_weight
			}
		}
	}
	return rockets.map(mapper)
}

const fetchRoadster = async () => {
	const data = await fetch(roadsterURL, { method: 'GET' })
	const roadster = await data.json()
	return {
		launchDate: roadster.launch_date_utc,
		earthDistance: roadster.earth_distance_km,
		marsDistance: roadster.mars_distance_km,
		description: roadster.details,
		images: roadster.flickr_images,
	}
}