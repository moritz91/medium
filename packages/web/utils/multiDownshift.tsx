import { useState } from "react";
import Downshift from "downshift";
import { includes } from "lodash";

interface Props {
  onSelect: any;
  onChange: any;
}

export const MultiDownshift = (props: Props): any => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const stateReducer = (state: any, changes: any) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
        return {
          ...changes,
          isOpen: false,
          inputValue: ""
        };
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          highlightedIndex: state.highlightedIndex,
          isOpen: false,
          inputValue: ""
        };
      case Downshift.stateChangeTypes.changeInput:
        if (changes.inputValue == "")
          return {
            ...changes,
            isOpen: false,
            inputValue: ""
          };
      default:
        return changes;
    }
  };

  const handleSelection = (selectedItem: any, downshift: any) => {
    const callOnChange = () => {
      const { onSelect, onChange } = props;
      if (onSelect) {
        onSelect(selectedItems, getStateAndHelpers(downshift));
      }
      if (onChange) {
        onChange(selectedItems, getStateAndHelpers(downshift));
      }
    };
    if (includes(selectedItems, selectedItem)) {
      removeItem(selectedItem, callOnChange);
    } else {
      addSelectedItem(selectedItem, callOnChange);
    }
  };

  const removeItem = (idx: any, cb?: any) => {
    return (
      setSelectedItems(selectedItems.filter((_, i: number) => i !== idx)), cb
    );
  };

  const addSelectedItem = (item: any, cb: any) => {
    return setSelectedItems([...selectedItems, item]), cb;
  };

  const getRemoveButtonProps = ({ onClick, idx, ...props }: any = {}) => {
    return {
      onClick: (e: any) => {
        onClick && onClick(e);
        e.stopPropagation();
        removeItem(idx);
      },
      ...props
    };
  };

  const getStateAndHelpers = (downshift: any) => {
    return {
      getRemoveButtonProps,
      addSelectedItem,
      removeItem,
      selectedItems,
      ...downshift
    };
  };

  const { render, children = render }: any = props;

  return (
    <Downshift
      stateReducer={stateReducer}
      onChange={handleSelection}
      selectedItem={null}
      id="autocomplete"
      defaultHighlightedIndex={null}
    >
      {downshift => children(getStateAndHelpers(downshift))}
    </Downshift>
  );
};
