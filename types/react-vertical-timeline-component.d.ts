declare module "react-vertical-timeline-component" {
  import type { CSSProperties, ReactElement, ReactNode } from "react";

  export interface VerticalTimelineProps {
    animate?: boolean;
    children: ReactNode;
    className?: string;
    layout?: "1-column-left" | "1-column" | "2-columns" | "1-column-right";
    lineColor?: string;
  }

  export interface VerticalTimelineElementProps {
    children?: ReactNode;
    className?: string;
    contentArrowStyle?: CSSProperties;
    contentStyle?: CSSProperties;
    date?: ReactNode;
    dateClassName?: string;
    icon?: ReactElement;
    iconClassName?: string;
    iconStyle?: CSSProperties;
    id?: string;
    intersectionObserverProps?: {
      root?: Element | null;
      rootMargin?: string;
      threshold?: number;
      triggerOnce?: boolean;
    };
    position?: "left" | "right";
    style?: CSSProperties;
    textClassName?: string;
    visible?: boolean;
  }

  export const VerticalTimeline: (props: VerticalTimelineProps) => ReactElement;
  export const VerticalTimelineElement: (props: VerticalTimelineElementProps) => ReactElement;
}
