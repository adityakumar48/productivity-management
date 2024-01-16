import React from "react";
import Card from "./Card";
import FeatureCard from "./FeatureCard";
import Image1 from "../../../public/illustration 3.png";
import Image2 from "../../../public/illustration 4.png";
import Image3 from "../../../public/illustration 6.png";
import Image4 from "../../../public/building-user-interface.png";
import Image5 from "../../../public/illustration 18.png";

const FeatureSection = () => {
  return (
    <>
      <div className="px-28 pt-[10vh] h-screen ">
        <div className="md:flex flex-wrap  md:justify-evenly ">
          <Card
            image={Image1}
            linearGradientClass="taskManager"
            title="Task Managemer"
            shadowColor="shadow-[#da5f94]"
            description={
              " A task manager is a tool or application designed to help individuals or teams organize, track, and manage their tasks and activities."
            }
          />
          <Card
            image={Image2}
            linearGradientClass="techniqueTimer"
            shadowColor="shadow-[#ff8570]"
            title="Technique Timers"
            description={
              "These timers are employed to structure work intervals and breaks in order to enhance focus and efficiency."
            }
          />
          <Card
            image={Image3}
            linearGradientClass="notes"
            title="Notes"
            description={
              " A notes-taking app is a digital application designed to help users capture, organize, and store information in a digital format."
            }
            shadowColor="shadow-[#4316db]"
          />
          <Card
            image={Image4}
            linearGradientClass="statistics"
            title="Statistics"
            description={
              "collection, analysis, and presentation of data related to users' productivity and time management"
            }
            shadowColor="shadow-[#343563]"
          />
          <Card
            image={Image5}
            linearGradientClass="reminders"
            title="Reminders"
            description={
              " a feature that allows users to set notifications or alerts for specific events, tasks, or deadlines."
            }
            shadowColor="shadow-[#343563]"
          />
        </div>
      </div>
      {/* <FeatureCard /> */}
    </>
  );
};

export default FeatureSection;
