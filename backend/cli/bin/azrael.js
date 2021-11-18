#!/usr/bin/env node

// const program = require('commander');
// const inquirer = require('inquirer');

// const chalkPipe = require('chalk-pipe');

// const { Observable } = require('rxjs');

// /**
//  * -V
//  * --version
//  */
// program.version('0.0.1', '-v, --version');

// program.usage('<command> [options]');

// program
//   .option('-p, --pepper', 'add pepper')
//   .option('-C, --no-cheese', 'remove cheese')
//   .option('-X, --chdir [path]', 'change the working directory');

// program
//   .command('test <a>')
//   .alias('t')
//   .description('test desc')
//   .usage('[option] <file ...>')
//   .action(function(a) {
//     console.log('abc');
//     console.log('chdir: ', program.chdir);
//   });

// program
//   .command('new [name]')
//   .alias('n')
//   .description('Create a new project')
//   .action(function(name) {
//     const projectName = name || 'myApp';
//     init({ app: projectName });
//   });

// program
//   .command('create <type> [name] [options...]')
//   .alias('c')
//   .description('Generates new code')
//   .action(function(type, name, options) {
//     console.log('type', type);
//     console.log('name', name);
//     console.log('options', options);
//   });

// // program
// //   .command('*')
// //   .description('deploy the given env')
// //   .action(function(env) {
// //     console.log('deploying "%s"', env);
// //   });

// program.on('--help', function() {
//   console.log(
//     `
// Examples:
//   $ custom-help --help
//   $ custom-help -h
//     `
//   );
// });

// program.parse(process.argv);

// const questions = [
//   { type: 'input', name: 'user.name', message: "what's your name", default: 'Azrael' },
//   {
//     type: 'number', // input, number, confirm, list, rawlist, expand, checkbox, password, editor
//     name: 'user.phone', // 如果包含`.`,则会形成嵌套
//     message: 'your phone number',
//     /**
//      * String|Number|Boolean|Array|Function
//      */
//     default: function() {
//       return 17621833001;
//     },
//     /**
//      * Receive the user input and return the filtered value to be used inside the program.
//      * The value returned will be added to the Answers hash.
//      */
//     filter(input) {
//       return +('' + input).replace(/[-_]/g, '');
//     },
//     /**
//      * return a transformed value to display to the user
//      * 只影响用户界面的展示，不会修改输入结果
//      */
//     transformer: function(input, answers, flags) {
//       const text = chalkPipe('red')(input);
//       if (flags.isFinal) {
//         return `${text}!`;
//       }
//       return text;
//     },
//     /**
//      * Should return true if the value is valid
//      * an error message (String) otherwise
//      * If false is returned, a default error message is provided.
//      */
//     // validate: function(value) {
//     //   const pass = value.match(
//     //     /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
//     //   );
//     //   if (pass) {
//     //     return true;
//     //   }
//     //   return 'Please enter a valid phone number';
//     // },
//     /**
//      * async validate
//      */
//     validate: function(input) {
//       /**
//        * done(err, value)
//        */
//       const done = this.async();

//       setTimeout(function() {
//         if (typeof input !== 'number') {
//           // Pass the return value in the done callback
//           done('please input a number'); // 有问题，会报错
//           return;
//         }
//         // Pass the return value in the done callback
//         done(null, true);
//       }, 3000);
//     },
//     /**
//      * should return true or false depending on whether or not this question should be asked.
//      * Function || Boolean
//      * true: ask this question
//      * false: skip this question
//      */
//     when: function(answers) {
//       return answers.user.name === 'Azrael';
//     },
//     prefix: '⭐️ ', // default ?
//     suffix: ' ?' // default ''
//   },
//   {
//     type: 'confirm',
//     name: 'married',
//     message: '婚否?',
//     default: false
//   },
//   {
//     type: 'list',
//     name: 'theme',
//     message: "what's do you want to do ?",
//     /**
//      * Array|Function, returning a choices array
//      * If defined as a function, the first parameter will be
//      * the current inquirer session answers.
//      * - Array values
//      *  - number
//      *  - strings
//      *  - a Separator: new inquirer.Separator(separator)
//      *    - separator: default --------
//      *    - 实例有个type属性，值为 “separator”
//      *  - objects
//      *    - name: to display in list
//      *    - value: to save in the answers hash.( name if no value specified)
//      *    - short: to display after selection
//      *    - disabled: disabled this option
//      *    - checked: for checkbox
//      *    - key: for expand
//      */
//     choices: [
//       'Order a pizza',
//       'Make a reservation',
//       new inquirer.Separator('***********'),
//       'Ask for opening hours',
//       {
//         name: 'support',
//         value: 'hahaha',
//         short: 'ha'
//       },
//       {
//         name: 'Contact support',
//         disabled: 'Unavailable at this time'
//       },
//       'Talk to the receptionist'
//     ]
//   },
//   {
//     /**
//      * 可以通过输入序号快速选择
//      */
//     type: 'rawlist',
//     name: 'size',
//     message: 'What size do you need?',
//     choices: function(answers) {
//       return ['Jumbo', 'Large', 'Standard', 'Medium', 'Small', 'Micro'];
//     },
//     filter: function(val) {
//       return val.toLowerCase();
//     },
//     /**
//      * Change the number of lines that will be rendered when using list, rawList, expand or checkbox.
//      */
//     pageSize: 3
//   },
//   {
//     /**
//      * 值为数组
//      */
//     type: 'checkbox',
//     message: 'Select toppings',
//     name: 'toppings',
//     choices: [
//       new inquirer.Separator(' = The Meats = '),
//       {
//         name: 'Pepperoni'
//       },
//       {
//         name: 'Ham'
//       },
//       new inquirer.Separator(' = The Cheeses = '),
//       {
//         name: 'Mozzarella',
//         checked: true
//       },
//       {
//         name: 'Cheddar',
//         disabled: 'out of stock'
//       }
//     ],
//     validate: function(answer) {
//       if (answer.length < 1) {
//         return 'You must choose at least one topping.';
//       }
//       return true;
//     }
//   },
//   {
//     type: 'password',
//     message: 'Enter a password',
//     name: 'password1',
//     validate: value => {
//       if (/\w/.test(value) && /\d/.test(value)) {
//         return true;
//       }

//       return 'Password need to have at least a letter and a number';
//     }
//   },
//   {
//     type: 'password',
//     message: 'Enter a masked password',
//     name: 'password2',
//     /**
//      * 没有 mask 属性，输入hidden,
//      * 有 mask 属性，输入用 mask 代替
//      */
//     mask: '#'
//   },
//   {
//     type: 'expand',
//     message: 'Conflict on `file.js`: ',
//     name: 'overwrite',
//     choices: [
//       {
//         key: 'y',
//         name: 'Overwrite',
//         value: 'overwrite'
//       },
//       {
//         key: 'a',
//         name: 'Overwrite this one and all next',
//         value: 'overwrite_all'
//       },
//       {
//         key: 'd',
//         name: 'Show diff',
//         value: 'diff'
//       },
//       new inquirer.Separator(),
//       {
//         key: 'x',
//         name: 'Abort',
//         value: 'abort'
//       }
//     ]
//   },
//   {
//     type: 'editor',
//     name: 'bio',
//     message: 'Please write a short bio of at least 3 lines.',
//     validate: function(text) {
//       if (text.split('\n').length < 3) {
//         return 'Must be at least 3 lines.';
//       }

//       return true;
//     }
//   }
// ];

// inquirer
//   .prompt(questions)
//   .then(answers => {
//     console.log(JSON.stringify(answers));
//   })
//   .catch(err => {
//     console.error(err);
//   });

const execa = require('execa');
const Listr = require('listr');

const tasks = new Listr([
  {
    title: 'Git',
    /**
     *  if a task returns, it means the task was completed successfully
     *  if a task throws a error, the task failed
     *  be async by returning a Promise.
     *    - If the promise resolves, the task completed successfully
     *    - if it rejects, the task failed.
     *  return an Observable.
     *    it can emit multiple values and can be used to show the output of the task.
     *    only the last line of the output is rendered.
     *  return a ReadableStream
     */
    task: () => {
      return new Listr(
        [
          {
            title: 'Checking git status',
            task: () =>
              execa('git', ['status', '--porcelain'], { shell: true }).then(result => {
                if (result !== '') {
                  throw new Error('Unclean working tree. Commit or stash changes first.');
                }
              })
          },
          {
            title: 'Checking remote history',
            task: () =>
              execa('git', ['rev-list', '--count', '--left-only', '@{u}...HEAD']).then(result => {
                if (result !== '0') {
                  throw new Error('Remote history differ. Please pull changes.');
                }
              })
          }
        ],
        {
          /**
           * Set to true if you want to run tasks in parallel,
           * set to a number to control the concurrency
           * By default it runs tasks sequentially.
           */
          concurrent: true,
          /**
           * Set to false if you don't want to stop the execution of other tasks when one or more tasks fail.
           */
          exitOnError: true
        }
      );
    }
  },
  {
    title: 'Install package dependencies with Yarn',
    /**
     * A context object is passed as argument to every skip and task function.
     * This allows you to create composable tasks and change the behaviour of
     * your task depending on previous results.
     */

    /**
     * A special task object is passed as second argument to the task function.
     * lets you change the title while running your task
     * you can skip it depending on some results or you can update the task's output.
     */
    task: (ctx, task) =>
      execa('yarn').catch(() => {
        ctx.yarn = false;
        task.title = `${task.title} (or not)`;
        task.skip('Yarn not available, install it via `npm install -g yarn`');
      })
  },
  {
    title: 'Install package dependencies with npm',
    /**
     * By default, every task is enabled which means that every task will be executed
     * returns whether the task should be executed or not
     */
    enabled: ctx => ctx.yarn === false,
    /**
     * whether a task can be skipped
     *  - return  a truthy value or a Promise that resolves to a truthy value then the task will be skipped
     *    - returned value is a string it will be displayed as the reason for skipping the task.
     *  - returns a falsey value or a Promise that resolves to a falsey value then the task will be executed as normal
     *  - throws or returns a Promise that rejects, the task (and the whole build) will fail
     */
    skip: ctx => ctx.yarn !== false && 'Dependencies already installed with Yarn',
    task: (ctx, task) => {
      task.output = 'Installing dependencies...';
      return execa('npm', ['install']);
    }
  },
  {
    title: 'Run tests',
    task: () => execa('npm', ['test'])
  },
  {
    title: 'Publish package',
    task: () => execa('npm', ['publish'])
  },
  {
    title: 'Success',
    /**
     * Observable
     */
    task: () => {
      return new Observable(observer => {
        observer.next('Foo');
        setTimeout(() => {
          observer.next('Bar');
        }, 2000);
        setTimeout(() => {
          observer.complete();
        }, 4000);
      });
    }
  },
  {
    title: 'Failure',
    task: () => Promise.reject(new Error('Bar'))
  },
  {
    title: 'File',
    task: () => {
      fs.createReadStream('data.txt', 'utf8').pipe(split(/\r?\n/, null, { trailing: false }));
    }
  }
]);

tasks
  .run()
  .then(ctx => {
    console.log(ctx);
  })
  .catch(err => {
    console.error(err);
  });
