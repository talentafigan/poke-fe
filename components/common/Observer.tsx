import { useEffect, useRef, useState } from "react";

export default function CommonObserver(props: {
  onIntersecting: Function;
  options?: any;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const cachedRef: any = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        props.onIntersecting();
      }
    });
    observer.observe(cachedRef);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="h-1"></div>;
}
