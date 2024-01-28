import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, Badge } from "@radix-ui/themes";

interface Props {
  data: any;
}

const ShowActivity = ({ data }: Props) => {
  return (
    <div className="mt-5">
      {data &&
        data.map((item: any) => (
          <Accordion type="single" collapsible key={item.id}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="flex items-center gap-5 w-full justify-between  ">
                  {" "}
                  <div className="flex items-center pl-8 gap-5">
                    <Avatar
                      radius="full"
                      size={"2"}
                      src={item.image || null}
                      fallback={""}
                    />{" "}
                    <h2>{item.name}</h2>
                  </div>
                  <div className="flex gap-5">
                    <div className="flex items-center justify-end pr-8 gap-2">
                      <Badge variant="solid" color="green">
                        {item?.status || "Active"}
                      </Badge>
                    </div>
                    <Badge color="purple" size={"2"}>
                      {item?.Notes?.length}
                    </Badge>
                    <Badge color="purple" size={"2"}>
                      {item?.reminders?.length}
                    </Badge>
                    <Badge color="purple" className="mr-5" size={"2"}>
                      {item?.Tasks?.length}
                    </Badge>
                  </div>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-2 justify-end w-full pr-8">
                  <span>
                    <Badge
                      color="purple"
                      size={"2"}
                      className=" font-semibold flex flex-col"
                    >
                      <p>{item?.Notes?.length}</p>
                      <p className="">Notes</p>
                    </Badge>
                  </span>
                  <span>
                    <Badge
                      color="purple"
                      size={"2"}
                      className=" font-semibold flex flex-col"
                    >
                      <p>{item?.reminders?.length}</p>
                      <p className="">Reminders</p>
                    </Badge>
                  </span>
                  <span>
                    <Badge
                      color="purple"
                      size={"2"}
                      className=" font-semibold flex flex-col"
                    >
                      <p>{item?.Tasks?.length}</p>
                      <p className="">Tasks</p>
                    </Badge>
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
};

export default ShowActivity;
