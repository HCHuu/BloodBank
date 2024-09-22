import React from "react";
import DonateActivitiesList from "../../components/Activity/DonateActivitiesList";

function ProcessingActivities() {
  return (
    <div>
      <DonateActivitiesList type={"processing"} status="1" />
    </div>
  );
}

export default ProcessingActivities;
