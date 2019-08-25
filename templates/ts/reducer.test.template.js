const changeCase = require('change-case/change-case');

module.exports = options => `
import { ${options.name}Reducer } from './${options.name}.reducer';
import {${options.name}State} from './${options.name}.interface';
import {
    ${options.actions
      .reduce(
        (actions, action) => [...actions, action, `${action}_${options.OkSuffix}`, `${action}_${options.ErrSuffix}`],
        []
      )
      .map(action => `${options.name}${changeCase.pascalCase(action)}Action`)
      .join(',\n')}
} from './${options.name}.actions';

describe("${options.name}.reducer.ts  tests", () => {
${options.actions
  .map(
    action => `
  it('should update the state properly for "${action}"', () => {
    const given:${options.name}State = {
      pending: false,
      data: { dummy: "state" },
      error: undefined
    };

    const action = ${options.name}${changeCase.pascalCase(action)}Action(
      { dummy: "payload" }
    );

    const expected:${options.name}State = {
      pending: true,
      data: { dummy: "state" },
      error: undefined
    };

    expect(${options.name}Reducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "${action}_${options.OkSuffix}"', () => {
    const given:${options.name}State = {
      pending: true,
      data: undefined,
      error: undefined
    };

    const action = ${options.name}${changeCase.pascalCase(`${action}_${options.OkSuffix}`)}Action(
      { dummy: "payload" }
    );

    const expected:${options.name}State = {
      pending: false,
      data: { dummy: "payload" },
      error: undefined
    };

    expect(${options.name}Reducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "${action}_${options.ErrSuffix}"', () => {
    const given:${options.name}State = {
      pending: true,
      data: { dummy: "state" },
      error: undefined
    };

    const action = ${options.name}${changeCase.pascalCase(`${action}_${options.ErrSuffix}`)}Action(
      "error"
    );

    const expected:${options.name}State = {
      pending: false,
      data: { dummy: "state" },
      error: "error"
    };

    expect(${options.name}Reducer(given, action)).toEqual(expected);
  });`
  )
  .join('\n')}
});
`;
