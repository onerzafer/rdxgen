module.exports = options => `
import { ${options.name}Reducer } from './${options.name}.reducer';

describe("${options.name}.reducer.js  tests", () => {
${options.actions
  .map(
    action => `
  it('should update the state properly for "${action}"', () => {
    const given = {
      pending: false,
      data: { dummy: "state" },
      error: undefined
    };

    const action = {
      type: "${action}",
      payload: { dummy: "payload" }
    };

    const expected = {
      pending: true,
      data: { dummy: "state" },
      error: undefined
    };

    expect(${options.name}Reducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "${action}_${options.OkSuffix}"', () => {
    const given = {
      pending: true,
      data: undefined,
      error: undefined
    };

    const action = {
      type: "${action}_${options.OkSuffix}",
      payload: { dummy: "payload" }
    };

    const expected = {
      pending: false,
      data: { dummy: "payload" },
      error: undefined
    };

    expect(${options.name}Reducer(given, action)).toEqual(expected);
  });

  it('should update the state properly for "${action}_${options.ErrSuffix}"', () => {
    const given = {
      pending: true,
      data: { dummy: "state" },
      error: undefined
    };

    const action = {
      type: "${action}_${options.ErrSuffix}",
      payload: { dummy: "error" }
    };

    const expected = {
      pending: false,
      data: { dummy: "state" },
      error: { dummy: "error" }
    };

    expect(${options.name}Reducer(given, action)).toEqual(expected);
  });`
  )
  .join('\n')}
});
`;
