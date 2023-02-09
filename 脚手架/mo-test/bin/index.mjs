#!/usr/bin/env node
import inquirer from "inquirer";
inquirer
  .prompt([
    // {
    //   type: "input",
    //   name: "name",
    //   message: "Your project name",
    //   validate: function (input) {
    //     if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
    //     else
    //       return "Project name may only include letters, numbers, underscores and hashes.";
    //   },
    //   transformer: function (input) {
    //     return "[" + input + "]";
    //   },
    //   filter: function (input) {
    //     return input.toLowerCase();
    //   },
    // },
    // {
    //   type: "number",
    //   name: "age",
    //   message: "How old are you?",
    // },
    // {
    //   type: "confirm",
    //   name: "isTest",
    //   message: "是否测试？",
    // },
    // {
    //   type: "rawlist", //list,
    //   name: "framework",
    //   message: "Which framework do you want to use?",
    //   choices: ["React", "Vue", "Angular"],
    // },
    // {
    //   type: "expand",
    //   name: "framework",
    //   message: "Which framework do you want to use?",
    //   choices: [
    //     { key: "r", name: "React", value: "react" },
    //     { key: "v", name: "Vue", value: "vue" },
    //     { key: "a", name: "Angular", value: "angular" },
    //   ],
    // },
    // {
    //   type: "checkbox",
    //   name: "framework",
    //   message: "Which framework do you want to use?",
    //   choices: [
    //     { name: "React", value: 1 },
    //     { name: "Vue", value: 2 },
    //     { name: "Angular", value: 3 },
    //   ],
    // },
    // {
    //   type: "password",
    //   name: "password",
    // },
    {
      type: "editor",
      name: "editor",
      message: "请输入内容",
    },
  ])
  .then((answers) => {
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
