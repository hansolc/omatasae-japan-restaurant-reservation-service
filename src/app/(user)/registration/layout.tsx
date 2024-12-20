import Section from "@/components/common/section";
import Goback from "@components/user/GoBack";
import React from "react";

const RegistrationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Section className="h-full flex flex-col">
      <Goback />
      {children}
    </Section>
  );
};

export default RegistrationLayout;
