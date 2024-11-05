import { useState, useEffect } from "react";

type ScriptStatus = "idle" | "loading" | "ready" | "error";

interface UseScriptOptions {
  src: string;
  integrity?: string;
  crossorigin?: string;
}

export const useScript = ({
  src,
  integrity,
  crossorigin,
}: UseScriptOptions): ScriptStatus => {
  const [status, setStatus] = useState<ScriptStatus>(src ? "loading" : "idle");

  useEffect(() => {
    if (!src) {
      setStatus("idle");
      return;
    }

    let script = document.querySelector(
      `script[src="${src}"]`
    ) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      // Set integrity and crossorigin if provided
      if (integrity) script.integrity = integrity;
      if (crossorigin) script.crossOrigin = crossorigin;

      document.body.appendChild(script);

      const setAttributeFromEvent = (event: Event) => {
        script.setAttribute(
          "data-status",
          event.type === "load" ? "ready" : "error"
        );
      };

      script.addEventListener("load", setAttributeFromEvent);
      script.addEventListener("error", setAttributeFromEvent);
    } else {
      setStatus(script.getAttribute("data-status") as ScriptStatus);
    }

    const setStateFromEvent = (event: Event) => {
      setStatus(event.type === "load" ? "ready" : "error");
    };

    script.addEventListener("load", setStateFromEvent);
    script.addEventListener("error", setStateFromEvent);

    return () => {
      if (script) {
        script.removeEventListener("load", setStateFromEvent);
        script.removeEventListener("error", setStateFromEvent);
      }
    };
  }, [src, integrity, crossorigin]);

  return status;
};

export const useResponsiveWidth = ({
  width1,
  bp1_2,
  width2,
  bp2_3,
  width3,
  setWidth,
}: {
  width1: string;
  bp1_2: number;
  width2: string;
  bp2_3?: number;
  width3?: string;
  setWidth: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useEffect(() => {
    const updateWidth = () => {
      const windowWidth = window.innerWidth;
      let targetWidth = windowWidth < bp1_2 ? width1 : width2;
      if (bp2_3 && width3) {
        targetWidth =
          windowWidth < bp1_2 ? width1 : windowWidth < bp2_3 ? width2 : width3;
      }
      setWidth(targetWidth);
    };

    window.addEventListener("resize", updateWidth);
    updateWidth();

    return () => window.removeEventListener("resize", updateWidth);
  }, []);
};
