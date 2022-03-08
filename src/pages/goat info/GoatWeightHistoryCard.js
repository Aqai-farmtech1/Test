import React from "react";
import { goatInfoImage, weightIcon24 } from "../../utils/constants";
import GoatWeightDiffCard from "./GoatWeightDiffCard";

export default function GoatWeightHistoryCard({ weightData }) {
  const dateWeighed = new Date(weightData.date_weighed);
  const weighedDate = dateWeighed.toLocaleDateString();
  const weighedTime = dateWeighed.toLocaleTimeString();
  return (
    <div className="goat_weight_history_card_main">
      <div className="goat_weight_history_card_date">
        <h1>{weighedDate}</h1>
        <h2>{weighedTime}</h2>
      </div>
      <div className="goat_weight_history_card_image_wrapper">
        <img src={goatInfoImage} alt="goat" />
      </div>
      <div className="goat_weight_history_card_content">
        <div className="goat_weight_history_card_content_weight">
          <div className="goat_info_weight_history_weight_info">
            <img src={weightIcon24} alt="weight" />
            <h1>20Kg</h1>
          </div>
          <GoatWeightDiffCard
            weightDifference={weightData.weight_difference}
            shrinkage={false}
          />
        </div>
        <div className="goat_weight_history_card_content_farm">
          Farm : Redhills
        </div>
        <div className="goat_weight_history_card_content_rfid">
          Device : 00000000946d203f
        </div>
      </div>
    </div>
  );
}
