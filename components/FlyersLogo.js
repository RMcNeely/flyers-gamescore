import Image from "next/image"

export default function FlyersLogo() {
	return <Image
		src="/flyers-logo.svg"
		alt="Philadelphia Flyers Logo"
		// layout="fill"
		height={128}
		width={128}
	/>
}