import React from "react";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import phone from "@/public/phone.png";

export default function Home() {
	return (
		<div
			className="grid place-items-center gap-6 mb-8"
			style={{ overflowY: "hidden" }}
		>
			<div className="text-[#b8b8b8] w-fit rounded-lg bg-[#1c1c1c] p-4 hover:scale-110 transition ease-in-out duration-200 cursor-pointer">
				Next generation of
			</div>
			<h1 className="text-8xl text-transparent font-medium bg-gradient-to-b from-[#f0f0f0] to-[#fff] bg-clip-text">
				expense tracking.
			</h1>
			<div className="flex justify-center items-center gap-12 mx-auto">
				<Image src={phone} alt="phone-image" className="" />
				<div className="grid place-items-center gap-6	">
					<p className="text-xl text-center max-w-[43rem] text-[#eee]">
						PennyTrack is the ultimate tool for managing your money and staying
						on top of your expenses. With our easy-to-use app, you can quickly
						input and categorize your expenses, set and track a budget.
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
