module.exports = options => `import {${options.name}ActionTypes} from './${options.name}.actions';
import {${options.name}State, ${options.name}Action } from './${options.name}.interface';

const ${options.name}InitialState: ${options.name}State = {
  pending: false,
  data: undefined,
  error: undefined,
};

export const ${options.name}Reducer = (
    state: ${options.name}State = ${options.name}InitialState,
    action: ${options.name}Action
): ${options.name}State => {
  switch (action.type) {
    ${options.actions
      .map(action => {
        return `
        case ${options.name}ActionTypes.${action}: {
          return {
            ...state,
            pending: true,
          }
        }
        case ${options.name}ActionTypes.${action}_${options.OkSuffix}: {
          return {
            ...state,
            pending: false,
            data: action.payload,
          }
        }
        case ${options.name}ActionTypes.${action}_${options.ErrSuffix}: {
          return {
            ...state,
            pending: false,
            error: action.payload,
          }
        }
      `;
      }, [])
      .join('')}
    default:
      return state;
  }
};
`;
