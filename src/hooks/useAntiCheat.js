import { useEffect, useRef } from "react";

/**
 * AntiCheat Hook
 * Завершает тест при уходе со вкладки или сворачивании окна.
 */
export default function useAntiCheat({ onLock, onViolation, maxViolations = 1 }) {
  const count = useRef(0);

  useEffect(() => {
    const check = (reason) => {
      count.current++;
      console.log("⚠️ Нарушение:", reason, "(", count.current, ")");
      onViolation?.(count.current, reason);
      if (count.current >= maxViolations) {
        console.warn("🚫 Тест заблокирован по причине:", reason);
        onLock?.(reason);
      }
    };

    function handleVisibility() {
      if (document.visibilityState === "hidden") check("visibilitychange");
    }

    function handleBlur() {
      check("blur");
    }

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
    };
  }, [onLock, onViolation, maxViolations]);
}
