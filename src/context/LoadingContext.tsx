"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";

interface LoadingContextType {
  isAssetsLoaded: boolean;
  isVideoFinished: boolean;
  isReady: boolean;
  setVideoFinished: (finished: boolean) => void;
  progress: number;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isVideoFinished, setVideoFinished] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("preloaderShown") === "true";
    }
    return false;
  });
  const { progress, active } = useProgress();
  const [isAssetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    if (progress === 100 || !active) {
      const timer = setTimeout(() => setAssetsLoaded(true), 500);
      return () => clearTimeout(timer);
    } else {
      setAssetsLoaded(false);
    }
  }, [progress, active]);

  const isReady = isAssetsLoaded && isVideoFinished;

  return (
    <LoadingContext.Provider
      value={{
        isAssetsLoaded,
        isVideoFinished,
        isReady,
        setVideoFinished,
        progress,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
