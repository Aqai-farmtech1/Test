import React from "react";
import "./goatinfo.css";
import { weightDiffDownArrow, weightDiffUpArrow } from "../../utils/constants";

export default function GoatWeightDiffCard({ weight, shrinkage }) {
  const shrinkedStyle = {
    backgroundColor: "#FF5A75",
  };
  const idleStyle = {
    backgroundColor: "#B2BEC3",
  };
  const notShrinkedStyle = {
    backgroundColor: "#20C595",
  };

  return (
    <div
      className="goat_weight_diff_card_conatiner"
      style={shrinkage ? shrinkedStyle : notShrinkedStyle}
    >
      <img
        src={shrinkage ? weightDiffDownArrow : weightDiffUpArrow}
        alt="diff indicator"
      />
      {weight}Kg
    </div>
  );
}
