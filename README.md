# rdxgen: Redux Reducer and Action boilerplate Generator

A simple CLI to generate reducer and action files and their respective tests under given folder

## Installaion

```bash
npm install rdxgen -g
```

or

```bash
yarn global add rdxgen
```

## Usage

Since its an interactive CLI you simple call following command and it will ask quetions to you. Answer the questions and you will get your boilerplate ready to use. The good thing is all the test are green :)

```bash
rdxgen reducer
```

Then the CLI start asking following questions

```bash
? Name of new reducer:
? path of store:
? Enter actions with space saperated:
? Success suffix:
? Error suffix:
```

## Example

Let`s assume we would like to have a Products reducer and related actions.

```bash
rdxgen r
? Name of new reducer: Producsts
? path of store: src/reduxStore
? Enter actions with space saperated: GET_PRODUCTS UPDATE_PRODUCT ADD_PRODUCT DELETE_PRODUCT
? Success suffix: SUCCESS
? Error suffix: ERROR
```

This will create following files

- src/reduxStore/Products/Products.actions.js
- src/reduxStore/Products/Products.actions.test.js
- src/reduxStore/Products/Products.reducer.js
- src/reduxStore/Products/Products.reducer.test.js

the contents of these files will be:

Products.actions.js

```javascript
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';

export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_ERROR = 'UPDATE_PRODUCT_ERROR';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = 'ADD_PRODUCT_ERROR';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';

export const GetProductsAction = payload => ({
  type: GET_PRODUCTS,
  payload,
});

export const GetProductsSuccessAction = payload => ({
  type: GET_PRODUCTS_SUCCESS,
  payload,
});

export const GetProductsErrorAction = payload => ({
  type: GET_PRODUCTS_ERROR,
  payload,
});

export const UpdateProductAction = payload => ({
  type: UPDATE_PRODUCT,
  payload,
});

export const UpdateProductSuccessAction = payload => ({
  type: UPDATE_PRODUCT_SUCCESS,
  payload,
});

export const UpdateProductErrorAction = payload => ({
  type: UPDATE_PRODUCT_ERROR,
  payload,
});

export const AddProductAction = payload => ({
  type: ADD_PRODUCT,
  payload,
});

export const AddProductSuccessAction = payload => ({
  type: ADD_PRODUCT_SUCCESS,
  payload,
});

export const AddProductErrorAction = payload => ({
  type: ADD_PRODUCT_ERROR,
  payload,
});

export const DeleteProductAction = payload => ({
  type: DELETE_PRODUCT,
  payload,
});

export const DeleteProductSuccessAction = payload => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload,
});

export const DeleteProductErrorAction = payload => ({
  type: DELETE_PRODUCT_ERROR,
  payload,
});
```

Products.actions.test.js

```javascript
import {
  GetProductsAction,
  GetProductsSuccessAction,
  GetProductsErrorAction,
  UpdateProductAction,
  UpdateProductSuccessAction,
  UpdateProductErrorAction,
  AddProductAction,
  AddProductSuccessAction,
  AddProductErrorAction,
  DeleteProductAction,
  DeleteProductSuccessAction,
  DeleteProductErrorAction,
} from './Products.actions';

describe('Products.actions.js tests', () => {
  it('should has the correct type and payload for GetProductsAction', () => {
    const given = { some: 'dummy' };
    const expected = { type: 'GET_PRODUCTS', payload: { some: 'dummy' } };

    expect(GetProductsAction(given).type).toEqual('GET_PRODUCTS');
    expect(GetProductsAction(given)).toEqual(expected);
  });

  it('should has the correct type and payload for GetProductsSuccessAction', () => {
    const given = { some: 'dummy' };
    const expected = {
      type: 'GET_PRODUCTS_SUCCESS',
      payload: { some: 'dummy' },
    };

    expect(GetProductsSuccessAction(given).type).toEqual(
      'GET_PRODUCTS_SUCCESS'
    );
    expect(GetProductsSuccessAction(given)).toEqual(expected);
  });

  it('should has the correct type and payload for GetProductsErrorAction', () => {
    const given = { some: 'dummy' };
    const expected = { type: 'GET_PRODUCTS_ERROR', payload: { some: 'dummy' } };

    expect(GetProductsErrorAction(given).type).toEqual('GET_PRODUCTS_ERROR');
    expect(GetProductsErrorAction(given)).toEqual(expected);
  });

  it('should has the correct type and payload for UpdateProductAction', () => {
    const given = { some: 'dummy' };
    const expected = { type: 'UPDATE_PRODUCT', payload: { some: 'dummy' } };

    expect(UpdateProductAction(given).type).toEqual('UPDATE_PRODUCT');
    expect(UpdateProductAction(given)).toEqual(expected);
  });

  it('should has the correct type and payload for UpdateProductSuccessAction', () => {
    const given = { some: 'dummy' };
    const expected = {
      type: 'UPDATE_PRODUCT_SUCCESS',
      payload: { some: 'dummy' },
    };

    expect(UpdateProductSuccessAction(given).type).toEqual(
      'UPDATE_PRODUCT_SUCCESS'
    );
    expect(UpdateProductSuccessAction(given)).toEqual(expected);
  });

  it('should has the correct type and payload for UpdateProductErrorAction', () => {
    const given = { some: 'dummy' };
    const expected = {
      type: 'UPDATE_PRODUCT_ERROR',
      payload: { some: 'dummy' },
    };

    expect(UpdateProductErrorAction(given).type).toEqual(
      'UPDATE_PRODUCT_ERROR'
    );
    expect(UpdateProductErrorAction(given)).toEqual(expected);
  });

  it('should has the correct type and payload for AddProductAction', () => {
    const given = { some: 'dummy' };
    const expected = { type: 'ADD_PRODUCT', payload: { some: 'dummy' } };

    expect(AddProductAction(given).type).toEqual('ADD_PRODUCT');
    expect(AddProductAction(given)).toEqual(expected);
  });

  it('should has the correct type and payload for AddProductSuccessAction', () => {
    const given = { some: 'dummy' };
    const expected = {
      type: 'ADD_PRODUCT_SUCCESS',
      payload: { some: 'dummy' },
    };

    expect(AddProductSuccessAction(given).type).toEqual('ADD_PRODUCT_SUCCESS');
    expect(AddProductSuccessAction(given)).toEqual(expected);
  });

  it('should has the correct type and payload for AddProductErrorAction', () => {
    const given = { some: 'dummy' };
    const expected = { type: 'ADD_PRODUCT_ERROR', payload: { some: 'dummy' } };

    expect(AddProductErrorAction(given).type).toEqual('ADD_PRODUCT_ERROR');
    expect(AddProductErrorAction(given)).toEqual(expected);
  });

  it('should has the correct type and payload for DeleteProductAction', () => {
    const given = { some: 'dummy' };
    const expected = { type: 'DELETE_PRODUCT', payload: { some: 'dummy' } };

    expect(DeleteProductAction(given).type).toEqual('DELETE_PRODUCT');
    expect(DeleteProductAction(given)).toEqual(expected);
  });

  it('should has the correct type and payload for DeleteProductSuccessAction', () => {
    const given = { some: 'dummy' };
    const expected = {
      type: 'DELETE_PRODUCT_SUCCESS',
      payload: { some: 'dummy' },
    };

    expect(DeleteProductSuccessAction(given).type).toEqual(
      'DELETE_PRODUCT_SUCCESS'
    );
    expect(DeleteProductSuccessAction(given)).toEqual(expected);
  });

  it('should has the correct type and payload for DeleteProductErrorAction', () => {
    const given = { some: 'dummy' };
    const expected = {
      type: 'DELETE_PRODUCT_ERROR',
      payload: { some: 'dummy' },
    };

    expect(DeleteProductErrorAction(given).type).toEqual(
      'DELETE_PRODUCT_ERROR'
    );
    expect(DeleteProductErrorAction(given)).toEqual(expected);
  });
});
```

Products.reducer.js

```javascript
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
} from './Products.actions';

const ProductsInitialState = {
  pending: false,
  data: undefined,
  error: undefined,
};

export const ProductsReducer = (state = ProductsInitialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        pending: true,
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    }
    case GET_PRODUCTS_ERROR: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    }

    case UPDATE_PRODUCT: {
      return {
        ...state,
        pending: true,
      };
    }
    case UPDATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    }
    case UPDATE_PRODUCT_ERROR: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    }

    case ADD_PRODUCT: {
      return {
        ...state,
        pending: true,
      };
    }
    case ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    }
    case ADD_PRODUCT_ERROR: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    }

    case DELETE_PRODUCT: {
      return {
        ...state,
        pending: true,
      };
    }
    case DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    }
    case DELETE_PRODUCT_ERROR: {
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};
```

Products.reducer.test.js

```javascript
import { ProductsReducer } from './Products.reducer';

describe('Products.reducer.js  tests', () => {
  it('should update the state properly for "GET_PRODUCTS"', () => {
    const given = {
      pending: false,
      data: { dummy: 'state' },
      error: undefined,
    };

    const action = {
      type: 'GET_PRODUCTS',
      payload: { dummy: 'payload' },
    };

    const expected = {
      pending: true,
      data: { dummy: 'state' },
      error: undefined,
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "GET_PRODUCTS_SUCCESS"', () => {
    const given = {
      pending: true,
      data: undefined,
      error: undefined,
    };

    const action = {
      type: 'GET_PRODUCTS_SUCCESS',
      payload: { dummy: 'payload' },
    };

    const expected = {
      pending: false,
      data: { dummy: 'payload' },
      error: undefined,
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "GET_PRODUCTS_ERROR"', () => {
    const given = {
      pending: true,
      data: { dummy: 'state' },
      error: undefined,
    };

    const action = {
      type: 'GET_PRODUCTS_ERROR',
      payload: { dummy: 'error' },
    };

    const expected = {
      pending: false,
      data: { dummy: 'state' },
      error: { dummy: 'error' },
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "UPDATE_PRODUCT"', () => {
    const given = {
      pending: false,
      data: { dummy: 'state' },
      error: undefined,
    };

    const action = {
      type: 'UPDATE_PRODUCT',
      payload: { dummy: 'payload' },
    };

    const expected = {
      pending: true,
      data: { dummy: 'state' },
      error: undefined,
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "UPDATE_PRODUCT_SUCCESS"', () => {
    const given = {
      pending: true,
      data: undefined,
      error: undefined,
    };

    const action = {
      type: 'UPDATE_PRODUCT_SUCCESS',
      payload: { dummy: 'payload' },
    };

    const expected = {
      pending: false,
      data: { dummy: 'payload' },
      error: undefined,
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "UPDATE_PRODUCT_ERROR"', () => {
    const given = {
      pending: true,
      data: { dummy: 'state' },
      error: undefined,
    };

    const action = {
      type: 'UPDATE_PRODUCT_ERROR',
      payload: { dummy: 'error' },
    };

    const expected = {
      pending: false,
      data: { dummy: 'state' },
      error: { dummy: 'error' },
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "ADD_PRODUCT"', () => {
    const given = {
      pending: false,
      data: { dummy: 'state' },
      error: undefined,
    };

    const action = {
      type: 'ADD_PRODUCT',
      payload: { dummy: 'payload' },
    };

    const expected = {
      pending: true,
      data: { dummy: 'state' },
      error: undefined,
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "ADD_PRODUCT_SUCCESS"', () => {
    const given = {
      pending: true,
      data: undefined,
      error: undefined,
    };

    const action = {
      type: 'ADD_PRODUCT_SUCCESS',
      payload: { dummy: 'payload' },
    };

    const expected = {
      pending: false,
      data: { dummy: 'payload' },
      error: undefined,
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "ADD_PRODUCT_ERROR"', () => {
    const given = {
      pending: true,
      data: { dummy: 'state' },
      error: undefined,
    };

    const action = {
      type: 'ADD_PRODUCT_ERROR',
      payload: { dummy: 'error' },
    };

    const expected = {
      pending: false,
      data: { dummy: 'state' },
      error: { dummy: 'error' },
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "DELETE_PRODUCT"', () => {
    const given = {
      pending: false,
      data: { dummy: 'state' },
      error: undefined,
    };

    const action = {
      type: 'DELETE_PRODUCT',
      payload: { dummy: 'payload' },
    };

    const expected = {
      pending: true,
      data: { dummy: 'state' },
      error: undefined,
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "DELETE_PRODUCT_SUCCESS"', () => {
    const given = {
      pending: true,
      data: undefined,
      error: undefined,
    };

    const action = {
      type: 'DELETE_PRODUCT_SUCCESS',
      payload: { dummy: 'payload' },
    };

    const expected = {
      pending: false,
      data: { dummy: 'payload' },
      error: undefined,
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "DELETE_PRODUCT_ERROR"', () => {
    const given = {
      pending: true,
      data: { dummy: 'state' },
      error: undefined,
    };

    const action = {
      type: 'DELETE_PRODUCT_ERROR',
      payload: { dummy: 'error' },
    };

    const expected = {
      pending: false,
      data: { dummy: 'state' },
      error: { dummy: 'error' },
    };

    expect(ProductsReducer(given, action)).toEqual(expected);
  });
});
```
