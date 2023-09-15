import React, { ChangeEvent } from "react";

interface TextAreaProps {
  id?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

function TextArea({ id, value, onChange, placeholder, rows, className }: TextAreaProps) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={className}
    />
  );
}

export default TextArea;
