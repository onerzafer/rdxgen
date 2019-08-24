const changeCase = require('change-case/change-case');

module.exports = options => ` 
import {
    ${options.name}ActionTypes,
    ${options.actions
      .reduce(
        (actions, action) => [...actions, action, `${action}_${options.OkSuffix}`, `${action}_${options.ErrSuffix}`],
        []
      )
      .map(action => `${changeCase.pascalCase(action)}Action`)
      .join(',\n')}
} from './${options.name}.actions';

describe("${options.name}.actions.ts tests", () => {
    ${options.actions
      .reduce(
        (actions, action) => [...actions, action, `${action}_${options.OkSuffix}`, `${action}_${options.ErrSuffix}`],
        []
      )
      .map(
        action => `
  it("should has the correct type and payload for ${changeCase.pascalCase(action)}Action", () => {
    const payload = { some: "dummy" };
    const given = new ${changeCase.pascalCase(action)}Action(payload);

    expect(given.type).toEqual(${options.name}ActionTypes.${action});
    expect(given.payload).toEqual(payload);
  });`
      )
      .join('\n')}
});
`;
