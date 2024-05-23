#! /usr/bin/env node
import inquirer from "inquirer";
import figlet from "figlet";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import ora from "ora";
async function Entry() {
    await new Promise((resolve) => {
        figlet(" Welcome to ATM ", { font: "Slant" }, function (err, data) {
            if (err) {
                console.dir("oops something went wrong");
                console.log(err);
            }
            let animate = chalkAnimation.rainbow(data);
            setTimeout(() => {
                resolve(animate.stop());
            }, 3000);
        });
    });
}
await Entry();
async function my_bank_Account() {
    let my_balance = 70000;
    let my_Pin = 787898;
    let pinAnswer = await inquirer.prompt([
        {
            name: "pin",
            type: "number",
            message: "Enter your(787898) Pin Code :\n",
        },
    ]);
    if (pinAnswer.pin === my_Pin) {
        await new Promise((resolve) => {
            figlet("Verification Process", { font: "Slant" }, function (err, data) {
                if (err) {
                    console.dir("oops something went wrong");
                    console.log(err);
                }
                let animate = chalk.cyanBright(data);
                console.log(animate);
                let little_loader = ora("Please Wait For While It Is Pin Varification").start();
                setTimeout(() => {
                    resolve(little_loader.succeed("And You Are Verified"));
                }, 3000);
            });
        });
        // real code 
        let operationsAnswer = await inquirer.prompt([
            {
                name: "operation",
                type: "list",
                message: "\n\nWhat do you want to do \n\n Please Select One Option from below \n\n",
                choices: ["Check_Balance", "Fast_Cash", "Withdraw", "Exit"],
            },
        ]);
        if (operationsAnswer.operation === "Withdraw") {
            let amountAnswer = await inquirer.prompt([
                {
                    name: "amount",
                    type: "input",
                    message: "\n\nEnter you amount\n\n",
                },
            ]);
            if (amountAnswer.amount < my_balance) {
                my_balance -= amountAnswer.amount;
                console.log(`\t\nThank you for using our ATM \n now your current Balance is ${my_balance} `);
            }
            else {
                console.log(`\t\nYou have insufient balance. \n Sorry we can't help you.`);
            }
        }
        else if (operationsAnswer.operation === "Check_Balance") {
            console.log(chalk.yellow(`\n\n Your current Bank Balance is ${my_balance} \n\n`));
        }
        else if (operationsAnswer.operation === "Fast_Cash") {
            let FastcashAnswer = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "\n\nWhat do you want from Fast cash\n\t Please select from below\n\n",
                    choices: [50000, 40000, 30000, 20000],
                },
            ]);
            if (FastcashAnswer.fastCash === 50000) {
                my_balance -= 50000;
                console.log(chalk.blueBright(`\n\nThank you for using our ATM \n \nnow your current Balance is ${my_balance}\n `));
            }
            else if (FastcashAnswer.fastCash === 40000) {
                my_balance -= 40000;
                console.log(chalk.blueBright(`\n\nThank you for using our ATM \n \nnow your current Balance is ${my_balance}\n `));
            }
            else if (FastcashAnswer.fastCash === 30000) {
                my_balance -= 30000;
                console.log(chalk.blueBright(`\n\nThank you for using our ATM \n \nnow your current Balance is ${my_balance}\n `));
            }
            else if (FastcashAnswer.fastCash === 20000) {
                my_balance -= 20000;
                console.log(chalk.blueBright(`\n\nThank you for using our ATM \n \nnow your current Balance is ${my_balance} \n`));
            }
            else {
                console.log(chalk.blueBright(`\n\nYou have insufient balance.\n\nYour current Balance is ${my_balance} \n\n Sorry we can't help you.\n\n`));
            }
        }
        else if (operationsAnswer.operation === "Exit") {
            console.log(chalk.blueBright(`\n\n Thank you for using our ATM \n\n`));
            process.exit();
        }
    }
    else {
        console.log(chalk.red.bold(`\n\nPlease enter your valid Pincode number.\n\n\t Thank you For using our Atm \n\n`));
    }
}
// my_bank_Account();
async function Again() {
    do {
        await my_bank_Account();
        var restart = await inquirer.prompt([
            {
                name: "Again",
                type: "input",
                message: `\n\nYou want to visit our ATM again....?\n\n ${chalk.cyanBright("Press 'y' for continue..\n")}\n\n`,
            },
        ]);
    } while (restart.Again === "y" || restart.Again === "Y");
}
await Again();
