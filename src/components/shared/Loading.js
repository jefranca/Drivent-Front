import Loader from "react-loader-spinner";

export default function Loading() {
  return (
    <div style={{ textAlign: "center", color: "#6D6D6D" }}>
      <Loader 
        type="Oval" height={36} width={36} color="#6D6D6D"
      />
      <h4>Loading...</h4>
    </div>
  );
}
