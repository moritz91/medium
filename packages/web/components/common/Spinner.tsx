import { FaSpinner } from "react-icons/fa";

export function Spinner(props: any) {
  return <FaSpinner style={{}} aria-label="loading" {...props} />;
}

export const FullPageSpinner = () => {
  return (
    <div style={{ marginTop: "3em", fontSize: "4em" }}>
      <Spinner />
    </div>
  );
};
