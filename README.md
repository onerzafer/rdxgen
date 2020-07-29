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

- src/reduxStore/Products/Products.actions.js
- src/reduxStore/Products/Products.actions.test.js
- src/reduxStore/Products/Products.reducer.js
- src/reduxStore/Products/Products.reducer.test.js

or

This will create the following files

- src/reduxStore/Products/Products.actions.ts
- src/reduxStore/Products/Products.actions.test.ts
- src/reduxStore/Products/Products.interfaces.ts
- src/reduxStore/Products/Products.reducer.ts
- src/reduxStore/Products/Products.reducer.test.ts

## Templating

Templates are Handlebar templates and rdxgen passes some variables, so you can create the best template for your project. Even rdxgen has no opinion on libraries, the default templates are prepared for the most used libraries in the market. On typescript templates, the output files will be compatible with @ngrx/store and for the javascript side, the assumed library is redux.

You can easily export default templates with the following command

```bash
rdxgen -e
```

This command will not generate a reducer but will export the default templates. So you can add, change or remove stuff. You can even add more files like selector, effects, epics, and more templates.

### Template variables

rgxgen will dynamically generate from your answers. I will explain the rules here about how they are generated and can be used.

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
  "name": "Product Categories",
  "pascalName": "ProductCategories",
  "camelName": "productCategories",
  "actionTypes": [
    "PRODUCT_CATEGORIES_GET",
    "PRODUCT_CATEGORIES_GET_OK",
    "PRODUCT_CATEGORIES_GET_ERR",
    "PRODUCT_CATEGORIES_SET",
    "PRODUCT_CATEGORIES_SET_OK",
    "PRODUCT_CATEGORIES_SET_ERR"
  ],
  "actionNames": [
    "productCategoriesGetAction",
    "productCategoriesGetOkAction",
    "productCategoriesGetErrAction",
    "productCategoriesSetAction",
    "productCategoriesSetOkAction",
    "productCategoriesSetErrAction"
  ],
  "groupedActionTypes": [
    {
      "actionName": "productCategories",
      "service": "getProductCategories",
      "initType": "PRODUCT_CATEGORIES_GET",
      "initTypeValue": "[Product Categories] GET",
      "initAction": "productCategoriesGetAction",
      "okType": "PRODUCT_CATEGORIES_GET_OK",
      "okTypeValue": "[Product Categories] GET OK",
      "okAction": "productCategoriesGetOkAction",
      "errType": "PRODUCT_CATEGORIES_GET_ERR",
      "errTypeValue": "[Product Categories] GET ERR",
      "errAction": "productCategoriesGetErrAction"
    },
    {
      "actionName": "productCategories",
      "service": "setProductCategories",
      "initType": "PRODUCT_CATEGORIES_SET",
      "initTypeValue": "[Product Categories] SET",
      "initAction": "productCategoriesSetAction",
      "okType": "PRODUCT_CATEGORIES_SET_OK",
      "okTypeValue": "[Product Categories] SET OK",
      "okAction": "productCategoriesSetOkAction",
      "errType": "PRODUCT_CATEGORIES_SET_ERR",
      "errTypeValue": "[Product Categories] SET ERR",
      "errAction": "productCategoriesSetErrAction"
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
I tried to provide a broad choice over naming conventions. By using this structure any Handlebar template can be used. Moreover, it is possible to generate many more files. I would like to explain the **filePaths** variable. Default js templates contain the following files with the following names.
 * actions.template
 * actions.test.template
 * reducer.template
 * reducer.test.template

Therefore rdxgen drops the file suffix .template and populate the **filePaths** object with template names as keys. Values are the relative import paths for final generated files.

For any further questions don't hesitate to ask them via issues.
