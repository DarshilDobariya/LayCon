import { useState } from "react";
import { CircleLoader, DotLoader, PacmanLoader } from "react-spinners";
import ClipLoader from "react-spinners/ClipLoader";

import { MagnifyingGlass } from 'react-loader-spinner'

// const override: CSSProperties = {
// //   display: "block",
// //   margin: "0 auto",
// //   borderColor: "red",
// // };

function Loader() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <MagnifyingGlass
      visible={true}
      height="40"
      width="40"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#c0efff"
      color="#e15b64"
    />
  );
}

export default Loader;