module.exports = options => `import {${options.actions
  .reduce(
    (actions, action) => [
      ...actions,
      action,
      `${action}_${options.OkSuffix}`,
      `${action}_${options.ErrSuffix}`,
    ],
    []
  )
  .join(',')}} from './${options.name}.actions';

const ${options.name}InitialState = {
  pending: false,
  data: undefined,
  error: undefined,
};

export const ${options.name}Reducer = (
    state = ${options.name}InitialState,
    action
) => {
  switch (action.type) {
    ${options.actions
      .map(action => {
        return `
        case ${action}: {
          return {
            ...state,
            pending: true,
          }
        }
        case ${action}_${options.OkSuffix}: {
          return {
            ...state,
            pending: false,
            data: action.payload,
          }
        }
        case ${action}_${options.ErrSuffix}: {
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
