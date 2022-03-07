import React from "react";
import "./goatinfo.css";
import { weightDiffDownArrow, weightDiffUpArrow } from "../../utils/constants";

export default function GoatWeightDiffCard({ weightDifference, shrinkage }) {
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
      style={
        weightDifference
          ? shrinkage
            ? shrinkedStyle
            : notShrinkedStyle
          : idleStyle
      }
    >
      {weightDifference ? (
        <img
          src={shrinkage ? weightDiffDownArrow : weightDiffUpArrow}
          alt="diff indicator"
        />
      ) : (
        ""
      )}
      {weightDifference} Kg
    </div>
  );
}
