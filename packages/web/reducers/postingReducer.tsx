export const postingReducer = (state: any, action: any) => {
  switch (action.type) {
    case "openFlyout":
      return {
        ...state,
        flyoutId: action.id,
        flyoutState: true,
        ref1: action.ref1,
        ref2: action.ref2
      };
    case "openPopover":
      return {
        ...state,
        popoverId: action.id,
        popoverState: true
      };
    case "targetComment":
      return {
        ...state,
        targetId: action.id,
        targetState: true,
        ref3: action.ref3
      };
    case "closePopover":
      return {
        ...state,
        popoverId: "",
        popoverState: false
      };
    case "closeFlyout":
      return {
        ...state,
        flyoutId: "",
        flyoutState: false,
        ref1: { current: null },
        ref2: { current: null }
      };
    case "untargetComment":
      return {
        ...state,
        targetId: "",
        targetState: false,
        ref3: { current: null }
      };
    default: {
      return state;
    }
  }
};
