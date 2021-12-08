import React from "react";
/**
 * base props for generic HTML UI
*/
type BaseProps<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>,T>

/**
 * extends for all props which need custom
 * */ 
type BaseHTMLProps = BaseProps<HTMLElement>

export type {
    BaseProps as Props,
    BaseHTMLProps
}