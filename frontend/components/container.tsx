import React from 'react';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container(props: Readonly<ContainerProps>) {
  return (
    <div className={`container mx-auto ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
}
