import React, { ReactNode } from "react";
import cls from "classnames";
import AbsoluteIcon from "../AbsoluteIcon";
import CheckIcon from "@/components/user/CheckIcon";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

interface FormHeaderProps {
  children: ReactNode;
}

interface FormFieldContainerProps {
  children: ReactNode;
  multiple?: boolean;
  isSelectedTime?: boolean;
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: "text" | "date" | "time";
  placeholder?: string;
  className?: string;
}

// ***research
type FormComponentType = React.FunctionComponent<FormProps> & {
  Header: React.FunctionComponent<FormHeaderProps>;
  Input: React.FunctionComponent<FormInputProps>;
  FieldContainer: React.FunctionComponent<FormFieldContainerProps>;
};

const Form: FormComponentType = ({
  children,
  className,
  ...rest
}: FormProps) => {
  return (
    <form
      action=""
      className={`border rounded-lg px-3 py-7 shadow-md shadow-[#00000040] bg-white ${className}`}
      {...rest}
    >
      {children}
    </form>
  );
};

const FormHeader = ({ children }: FormHeaderProps) => {
  return <div className="flex justify-between">{children}</div>;
};

const FormInput = ({
  label,
  type = "text",
  placeholder,
  name,
  ...rest
}: FormInputProps) => {
  return (
    <div className={cls("w-full")}>
      <p className="text-[10px] font-bold">{label}</p>
      <input
        className={cls("w-full", {
          "border-b border-[#DDDDDD]": name === "googleLinks",
        })}
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

const FormFieldContainer = ({
  children,
  multiple = false,
  isSelectedTime = false,
}: FormFieldContainerProps) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <>
      {isSelectedTime && (
        <AbsoluteIcon
          Icon={<CheckIcon />}
          customClassName="top-[5px] right-[-5px]"
        />
      )}
      <div
        className={cls(
          "border border-[#717171] rounded-2xl h-14 px-3 py-2 my-2",
          {
            "flex ": multiple,
          },
          {
            "border-primary border-2": isSelectedTime,
          }
        )}
      >
        {childrenArray.map((child, idx) => {
          return (
            <React.Fragment key={`temporal_idx_key_${idx}`}>
              {child}
              {idx < childrenArray.length - 1 && (
                <div className="w-[1px] bg-[#717171] mx-3"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

Form.Header = FormHeader;
Form.Input = FormInput;
Form.FieldContainer = FormFieldContainer;

export default Form;
