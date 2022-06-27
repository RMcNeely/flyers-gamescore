const URL = 'https://api.nhle.com/stats/rest/en/skater'

const LOWER_LIMIT = 0
const UPPER_LIMIT = 100

const REPORTS = {
	'Scoring per Game': 'scoringpergame'
}

const FRANCHISES = [
	{ name: "Philadelphia Flyers", id: 16 },
	{ name: "Colorado Avalanche", id: 7 }
]

const SEASONS = [
	'20212022'
]

const SEASON_TYPE = {
	"playoffs": 1,
	"regular": 2 
}

const SORT = [
	{"property":"lastName","direction":"ASC_CI"},
	{"property":"skaterFullName","direction":"ASC_CI"},
	{"property":"playerId","direction":"ASC"}
]

export default async function (req, res) {
	const {
		franchise = 'Philadelphia Flyers',
		startSeason = '20212022',
		endSeason = '20212022', 
		seasonType = 'regular'
	 } = req;
	let flyersSkaters = 
		`https://api.nhle.com/stats/rest/en/skater/scoringpergame?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22pointsPerGame%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22goalsPerGame%22,%22direction%22:%22DESC%22%7D,%7B%22property%22:%22playerId%22,%22direction%22:%22ASC%22%7D%5D&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=franchiseId%3D16%20and%20gameTypeId=2%20and%20seasonId%3C=20212022%20and%20seasonId%3E=20212022`

	// const factCayenneExp = 'gamesPlayed>=1'
	// const cayenneExp = 
	// `${getFranchise(franchise)} and gameTypeId=${SEASON_TYPE[seasonType]} and seasonId<=${startSeason} and seasonId>=${endSeason}`

	const getFranchise = (franchise) => FRANCHISES.find(team => team.name === franchise)	

	const params = {
		'isAggregate': false,
		'isGame': false,
			'sort': JSON.stringify(SORT),
		'factCayenneExp': 'gamesPlayed>=1',
		'cayenneExp': `franchiseId=${getFranchise(franchise).id} and gameTypeId=${SEASON_TYPE[seasonType]} and seasonId<=${startSeason} and seasonId>=${endSeason}`
	}

	const searchParams = new URLSearchParams(params)

	let requestSkaters = `${URL}/${REPORTS['Scoring per Game']}?${searchParams.toString()}`

	console.log(requestSkaters)
	console.log(flyersSkaters)

	// let skaterResponse = await fetch(flyersSkaters)
	let skaterResponse = await fetch(requestSkaters)
	let skaterData = await skaterResponse.json()
	console.log(skaterData)

	res.status(200).json(skaterData)
	// res.status(200).json({ requestSkaters })
}
