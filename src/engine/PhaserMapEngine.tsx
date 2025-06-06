import { forwardRef, memo, useEffect, useLayoutEffect, useRef } from "react";

import { IEngineOptions } from "@/global";
import { EventBus } from "./EventBus";
import StartMapEngine from "./main";

export interface IRefPhaserMapEngine {
  engine: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
  engineOptions?: IEngineOptions;
}

export const PhaserMapEngine = memo(
  forwardRef<IRefPhaserMapEngine, IProps>(function PhaserMapEngine({ currentActiveScene, engineOptions }, ref) {
    const engine = useRef<Phaser.Game | null>(null!);

    useLayoutEffect(() => {
      if (engine.current === null) {
        engine.current = StartMapEngine("engine-container", engineOptions);

        if (typeof ref === "function") {
          ref({ engine: engine.current, scene: null });
        } else if (ref) {
          ref.current = { engine: engine.current, scene: null };
        }
      }

      return () => {
        if (engine.current) {
          engine.current.destroy(true);
          if (engine.current !== null) {
            engine.current = null;
          }
        }
      };
    }, [ref, engineOptions]);

    useEffect(() => {
      EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
        if (currentActiveScene && typeof currentActiveScene === "function") {
          currentActiveScene(scene_instance);
        }

        if (typeof ref === "function") {
          ref({ engine: engine.current, scene: scene_instance });
        } else if (ref) {
          ref.current = { engine: engine.current, scene: scene_instance };
        }
      });
      return () => {
        EventBus.removeListener("current-scene-ready");
      };
    }, [currentActiveScene, ref]);

    useEffect(() => {
      if (engine.current) {
        EventBus.emit("update-engine-options", engineOptions);
      }
    }, [engineOptions]);

    return <div id="engine-container"></div>;
  })
);

PhaserMapEngine.displayName = "PhaserMapEngine";
