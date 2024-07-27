
"use client";
import React from "react";
import StickyBox from "react-sticky-box";
interface StickySectionProps {
    children: React.ReactNode;
    key?: string;
    className?: string;
}

const StickySection: React.FC<StickySectionProps> = ({
    children,
    key,
    className,
}) => {
    return (
        <StickyBox className={className} offsetTop={10} key={key}>
            <div>{children}</div>
        </StickyBox>
    );
};

export default StickySection;
