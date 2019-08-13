export const tagReducer = (state: any, action: any) => {
  switch (action.type) {
    case "add":
      return [...state, { id: state.length, name: action.tag }];
    case "remove":
      return state.filter((_: any, idx: number) => idx != action.idx);
    default:
      throw new Error();
  }
};
