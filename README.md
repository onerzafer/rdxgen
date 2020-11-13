# rdxgen: Redux Reducer and Action boilerplate Generator

A simple and highly customizable CLI to generate the reducer and action files and their respective tests under the given folder.

🎉🎉🎉 Now it supports [templates](#templating) 🎉🎉🎉

## Installation

```bash
npm install rdxgen -g
```

or

```bash
yarn global add rdxgen
```

## Usage

Since its an interactive CLI, you simply call the following command, and it will ask questions to you. Answer the questions, and you will get your redux boilerplate ready to use whether as Javascript or Typescript. The good thing is all the test are green :)

For Javascript

```bash
rdxgen
```

For Typescript

```bash
rdxgen -t
```

Then the CLI starts asking the following questions

```bash
? Name of the new reducer (Product Categories):
? Path of the store (src/stores):
? Enter the space-separated action names (GET SET ...):
? Success suffix:
? Error suffix:
```

Don't forget to save your default answers by adding s to your command

```bash
rdxgen -s
```

Next time you will be asked way fewer questions.

## Example

Let`s assume we would like to have a Products reducer and related actions.

```bash
rdxgen
? Name of the new reducer (Product Categories): Products
? Path of the store (src/stores): src/reduxStore
? Enter the space-separated action names (GET SET ...): GET_PRODUCTS UPDATE_PRODUCT ADD_PRODUCT DELETE_PRODUCT
? Success suffix: SUCCESS
? Error suffix: ERROR
```

This will create the following files

- src/reduxStore/products/products.actions.js
- src/reduxStore/products/products.actions.test.js
- src/reduxStore/products/products.reducer.js
- src/reduxStore/products/products.reducer.test.js

or

This will create the following files

- src/reduxStore/products/products.actions.ts
- src/reduxStore/products/products.actions.test.ts
- src/reduxStore/products/products.interfaces.ts
- src/reduxStore/products/products.reducer.ts
- src/reduxStore/products/products.reducer.test.ts

## Templating

Templates are Handlebar templates and rdxgen passes some variables, and some helper functions, so you can create the best template for your project. Even rdxgen has no opinion on libraries, the default templates are prepared for the most used libraries in the market. On typescript templates, the output files will be compatible with @ngrx/store and for the javascript side, the assumed library is redux.

You can easily export default templates with the following command

```bash
rdxgen -e
```

This command will not generate a reducer but will export the default templates. So you can add, change or remove stuff. You can even add more files like selector, effects, epics, and more templates.

### Template variables

rdxgen will dynamically generate from your answers. I will explain the rules here about how they are generated and can be used.

Let's assume you gave the following answers:

```bash
rdxgen
? Name of the new reducer (Product Categories): Product categories
? Path of the store (src/stores): store
? Enter the space-separated action names (GET SET ...): GET SET
? Success suffix: OK
? Error suffix: ERR
```

the following variables will be filled like this.

```json
{
  "name": "product categories",
  "actions": [
    {
      "init": "get",    
      "ok": "get ok",    
      "err": "get err"    
    },
    {
      "init": "set",    
      "ok": "set ok",    
      "err": "set err"    
    }
  ],
  "filePaths": {
    "actions": "./product-categories.actions",
    "actions.test": "./product-categories.actions.test",
    "reducer": "./product-categories.reducer",
    "reducer.test": "./product-categories.reducer.tests"
  }
}
```
By using this structure any Handlebar template can be used. Moreover, it is possible to generate many more files. I would like to explain the **filePaths** variable. Default js templates contain the following files with the following names.
 * actions.template
 * actions.test.template
 * reducer.template
 * reducer.test.template

Therefore, rdxgen drops the file suffix .template and populate the **filePaths** object with template names as keys. Values are the relative import paths for final generated files.

### Helper functions
Helper functions are basically a subset of [change-case](https://github.com/blakeembrey/change-case) libraries functions exposed to handlebar run time. The exposed functions are as follows.
 * noCase
 * dotCase
 * swapCase
 * pathCase
 * upperCase
 * lowerCase
 * camelCase
 * snakeCase
 * titleCase
 * paramCase
 * headerCase
 * pascalCase
 * constantCase
 * sentenceCase
 * upperCaseFirst
 * lowerCaseFirst

The usage of these helper functions are a little different due to handlebars runtime then a normal javascript function. For instance:
```
// A normal constantCase usage would be
constantCase('some string') => SOME_STRING
// in template it can be used like normal handlebar helper function
{{constantCase 'some' 'string'}} => SOME_STRING
// same as
{{constantCase 'some string'}} => SOME_STRING
```

For any further questions don't hesitate to ask them via issues.
