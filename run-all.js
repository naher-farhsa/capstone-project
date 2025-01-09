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
		console.log(`[${name}] exited with code ${code}`);
	});
}

// Function to check if node_modules exist
function ensureNodeModules(projectPath) {
	const nodeModulesPath = path.join(projectPath, "node_modules");
	if (!fs.existsSync(nodeModulesPath)) {
		console.log(
			`[Setup]: node_modules not found in ${projectPath}. Installing dependencies...`,
		);
		execSync("npm install", { cwd: projectPath, stdio: "inherit" });
	} else {
		console.log(`[Setup]: node_modules found in ${projectPath}.`);
	}
}

// Function to check and activate Python virtual environment
function ensurePythonEnv(projectPath) {
	const venvPath = path.join(projectPath, "penv");
	if (fs.existsSync(venvPath)) {
		console.log(
			`[Setup]: Python virtual environment 'penv' found in ${projectPath}. Activating it...`,
		);
		try {
			execSync(`source penv/bin/activate && python train_model.py`, {
				cwd: projectPath,
				shell: true,
				stdio: "inherit",
			});
			console.log(
				`[Setup]: Python virtual environment activated and model trained.`,
			);
		} catch (error) {
			console.error(
				`[Setup ERROR]: Failed to activate 'penv' or train the model in ${projectPath}.`,
			);
			console.error(error);
		}
	} else {
		console.log(
			`[Setup]: Python virtual environment 'penv' not found. Creating and setting it up...`,
		);
		try {
			execSync(
				`python -m venv penv && source penv/bin/activate && pip install -r requirements.txt && python train_model.py`,
				{
					cwd: projectPath,
					shell: true,
					stdio: "inherit",
				},
			);
			console.log(
				`[Setup]: Python virtual environment 'penv' created, activated, and model trained.`,
			);
		} catch (error) {
			console.error(
				`[Setup ERROR]: Failed to set up 'penv' in ${projectPath}.`,
			);
			console.error(error);
		}
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
