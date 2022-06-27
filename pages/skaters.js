import Head from "next/head"
import Link from "next/link"
import FlyersLogo from "../components/FlyersLogo"
import { SKATERS } from "../data/skaters"
export default function Skaters () {
	const calculateameScore = (skater) => {
		const { G: goals, } = skater
	}

	
	return (
	<>
		<Head>
			<title>Flyers Gamescore: Skaters</title> 
		</Head>
		<FlyersLogo/>
		<h1>Skaters</h1>
		<ul>
			{SKATERS.map((skater) => {                                               
				return <li key={skater.Player}>
					{skater.Player}
				</li>
			})}
		</ul>


		<Link href="/">
			<a><h3>Home</h3></a>
		</Link>
	</>
	)
}