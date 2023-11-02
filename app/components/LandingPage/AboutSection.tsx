import Card from "./Card";

const AboutSection = () => {
  return (
    <div className=" md:px-28 px-8  pt-24">
      <h1 className="text-4xl pl-24 font-poppins font-bold pb-10">About</h1>
      <div className=" flex justify-center ,items-start">
        <div className="w-4/5 px-5 h-auto  md:flex items-center card rounded-lg drop-shadow-lg shadow-xl">
          <div className=" py-4 pr-5">
            {" "}
            <Card
              image="/illustration 2.png"
              linearGradientClass="aboutCardLinear"
              title="Productivity Hub"
              description={" Elevate Your Efficiency, Own Your Time"}
            />
          </div>
          <div className="md:flex-1">
            <div className=" bg-[rgba(255,255,255,30%)] py-5 px-5  rounded-lg drop-shadow-lg shadow-xl">
              <p>
                Productivity Hub is your all-in-one platform designed to
                transform the way you manage your daily life. Whether
                you&apos;re tackling work projects, juggling personal tasks, or
                striving for a more balanced routine, Productivity Hub is here
                to streamline your journey to success.
              </p>

              <div className="md:flex  gap-5 py-2 mt-2 ">
                <div className=" py-5 px-5  md:w-1/2 bg-[rgba(15,14,71,10%)] rounded-lg drop-shadow-lg shadow-xl">
                  <div className="flex  ">
                    <div className=" flex-1  items-center justify-center flex ">
                      <span className="h-10 w-10 bg-[rgba(15,14,71,20%)]  items-center justify-center flex text-center text-white rounded-full ">
                        1
                      </span>
                    </div>
                    <div className="pl-5 ">
                      <h1 className="font-bold  drop-shadow-none shadow-none ">
                        Effortless Task Mastery
                      </h1>
                      <p className="text-sm  ">
                        Seamlessly organize and prioritize tasks to boost
                        productivity.{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" py-5 px-5  md:w-1/2 bg-[rgba(15,14,71,10%)] rounded-lg drop-shadow-lg shadow-xl md:mt-0 mt-10 ">
                  <div className="flex">
                    <div className=" flex-1   items-center justify-center flex ">
                      <span className="h-10 w-10 bg-[rgba(15,14,71,20%)]  items-center justify-center flex text-center text-white rounded-full ">
                        2
                      </span>
                    </div>
                    <div className="pl-5 ">
                      <h1 className="font-bold  drop-shadow-none shadow-none ">
                        Technique Timers
                      </h1>
                      <p className="text-sm  ">
                        Leverage proven time-management techniques to enhance
                        focus and efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
