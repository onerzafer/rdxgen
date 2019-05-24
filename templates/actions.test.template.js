const changeCase = require('change-case');

module.exports = options => ` 
import {
    ${options.actions
      .reduce(
        (actions, action) => [
          ...actions,
          `${changeCase.pascalCase(action)}Action`,
          `${changeCase.pascalCase(`${action}_${options.OkSuffix}`)}Action`,
          `${changeCase.pascalCase(`${action}_${options.ErrSuffix}`)}Action`,
        ],
        []
      )
      .join(',\n')}
} from './${options.name}.actions';

describe("${options.name}.actions.js tests", () => {
    ${options.actions
      .reduce(
        (actions, action) => [
          ...actions,
          action,
          `${action}_${options.OkSuffix}`,
          `${action}_${options.ErrSuffix}`,
        ],
        []
      )
      .map(
        action => `
  it("should has the correct type and payload for ${changeCase.pascalCase(
    action
  )}Action", () => {
    const given = { some: "dummy" };
    const expected = { type: "${action}", payload: { some: "dummy" } };

    expect(${changeCase.pascalCase(
      action
    )}Action(given).type).toEqual('${action}');
    expect(${changeCase.pascalCase(action)}Action(given)).toEqual(expected);
  });`
      )
      .join('\n')}
});
`;
