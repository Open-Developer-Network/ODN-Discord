
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function FrameIdReader({ onValue }: { onValue: (value: string | null) => void }) {
  const params = useSearchParams();
  const frameId = params.get("frame_id");

  // Pass the value back up to the parent
  useEffect(() => {
    onValue(frameId);
  }, [frameId]);

  return null; // This component renders nothing
}
