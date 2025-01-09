import Image from "next/image";
import React from "react";
import chart from "@/public/chart.png";
import Link from "next/link";
import { Button } from "@material-tailwind/react";

export default function Features() {
	return (
		<div
			className="flex flex-col justify-center items-center gap-6 overflow-hidden"
			style={{ overflowY: "hidden" }}
		>
			<h1 className="text-8xl text-transparent font-medium bg-gradient-to-b from-[#f0f0f0] to-[#fff] bg-clip-text">
				Features.
			</h1>
			<div className="flex justify-center items-center mx-auto">
				<Image src={chart} alt="chart" className="w-auto" />
				<div className="grid place-items-center gap-6	">
					<p className="text-xl text-center text-[#eee] max-w-[55rem]">
						Welcome to PennyTrack, where managing your finances has never been
						easier. With our platform, you can effortlessly track your expenses,
						ensuring that every dollar is accounted for. Whether it&apos;s
						groceries, bills, or leisure activities, our intuitive interface
						allows you to input and monitor your spending with ease. Take
						control of your financial future by setting savings goals tailored
						to your needs. Our system ensures you never miss a payment deadline
						again, sending timely reminders to keep you on track and avoid
						unnecessary fees. Visualize your financial progress with dynamic
						charts that provide insights into your spending habits and savings
						trends. And to keep you informed every step of the way, receive
						convenient email notifications for important updates and reminders.
						Start your journey towards financial freedom today with our
						comprehensive PennyTrack, an expense tracker website.
					</p>
					<div className="flex items-center gap-4">
						<Link href="/login">
							<Button size="lg">Log In</Button>
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
			</div>
		</div>
	);
}
