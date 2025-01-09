import { Button } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";

export default function About() {
	return (
		<div className="grid justify-center items-center gap-6">
			<h1 className="text-8xl text-center text-transparent font-medium bg-gradient-to-b from-[#f0f0f0] to-[#fff] bg-clip-text">
				About.
			</h1>
			<p className="text-xl text-center text-[#eee] max-w-lg">
				PennyTrack is an expense tracker website built by final year college
				students. What once was a pet project turned into a real-world
				application that aims to simplify and enhance the way individuals manage
				their finances. Our journey began with a passion for coding and a shared
				vision to create a user-friendly platform for expense tracking.
			</p>
			<p className="text-xl text-center text-[#eee] max-w-lg">
				With a focus on simplicity and efficiency, PennyTrack allows users to
				effortlessly input and categorize their expenses, set budget goals, and
				gain insights into their spending habits. The website is constantly
				evolving, with new features and improvements being added to provide the
				best possible experience for our users.
			</p>
			<p className="text-xl text-center text-[#eee] max-w-lg">
				We are dedicated to continuous improvement and welcome feedback from our
				users to make PennyTrack a valuable tool in their financial journey.
				Thank you for being a part of our story as we strive to make money
				management accessible to everyone.
			</p>
			<div className="flex justify-center items-center gap-4">
				<Link href="/login">
					<Button size="lg" className="">
						Log In
					</Button>
				</Link>
				<Link href="/signup">
					<Button
						variant="outlined"
						size="lg"
						className="text-black hover:ring ring-gray-500 bg-light-green-500"
					>
						Sign Up
					</Button>
				</Link>
			</div>
		</div>
	);
}
