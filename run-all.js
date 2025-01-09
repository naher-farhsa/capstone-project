const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Function to run a command in a child process
function runCommand(command, args, cwd, name) {
	const process = spawn(command, args, { cwd, shell: true });

	process.stdout.on("data", (data) => {
		console.log(`[${name}]: ${data.toString()}`);
	});

	process.stderr.on("data", (data) => {
		console.error(`[${name} ERROR]: ${data.toString()}`);
	});

	process.on("close", (code) => {
		if (code !== 0) {
			console.error(`[${name} ERROR]: Exited with code ${code}`);
		} else {
			console.log(`[${name}]: Successfully exited with code ${code}`);
		}
	});
}

// Function to ensure Node.js dependencies are installed
function ensureNodeModules(projectPath) {
	const packageJsonPath = path.join(projectPath, "package.json");
	if (!fs.existsSync(packageJsonPath)) {
		console.error(`[Setup ERROR]: package.json not found in ${projectPath}.`);
		return;
	}

	const nodeModulesPath = path.join(projectPath, "node_modules");
	if (!fs.existsSync(nodeModulesPath)) {
		console.log(
			`[Setup]: Installing Node.js dependencies in ${projectPath}...`,
		);
		execSync("npm install", { cwd: projectPath, stdio: "inherit" });
	} else {
		console.log(
			`[Setup]: Node.js dependencies are already installed in ${projectPath}.`,
		);
	}
}

// Function to ensure Python virtual environment and dependencies
function ensurePythonEnv(projectPath) {
	const venvPath = path.join(projectPath, "penv");
	if (!fs.existsSync(venvPath)) {
		console.log(
			`[Setup]: Creating Python virtual environment in ${projectPath}...`,
		);
		execSync("python -m venv penv", { cwd: projectPath, stdio: "inherit" });
	}

	console.log(
		`[Setup]: Activating Python virtual environment and installing dependencies...`,
	);
	try {
		execSync(`source penv/bin/activate && pip install -r requirements.txt`, {
			cwd: projectPath,
			shell: true,
			stdio: "inherit",
		});
		console.log(`[Setup]: Python dependencies installed successfully.`);
	} catch (error) {
		console.error(
			`[Setup ERROR]: Failed to install Python dependencies in ${projectPath}.`,
		);
		console.error(error);
	}
}

// Define project paths and configurations
const projects = [
	{
		name: "PennyTrack-Frontend",
		command: "npm",
		args: ["run", "dev"],
		path: "./PennyTrack-frontend",
		preCheck: (project) => ensureNodeModules(project.path),
	},
	{
		name: "PennyTrack-Backend",
		command: "npm",
		args: ["run", "dev"],
		path: "./PennyTrack-backend",
		preCheck: (project) => ensureNodeModules(project.path),
	},
	{
		name: "PennyDrop",
		command: "python",
		args: ["app.py"],
		path: "./PennyDrop",
		preCheck: (project) => ensurePythonEnv(project.path),
	},
];

// Run all projects
console.log("Starting all projects...");
projects.forEach((project) => {
	console.log(`[Setup]: Preparing ${project.name}...`);
	project.preCheck(project); // Run pre-check for dependencies
	console.log(`[Start]: Starting ${project.name}...`);
	runCommand(project.command, project.args, project.path, project.name);
});
