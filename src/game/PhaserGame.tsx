import { forwardRef, memo, useEffect, useLayoutEffect, useRef } from "react";

import { IGameOptions } from "@/global";
import { EventBus } from "./EventBus";
import StartGame from "./main";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface IProps {
  currentActiveScene?: (scene_instance: Phaser.Scene) => void;
  gameOptions?: IGameOptions;
}

export const PhaserGame = memo(
  forwardRef<IRefPhaserGame, IProps>(function PhaserGame({ currentActiveScene, gameOptions }, ref) {
    const game = useRef<Phaser.Game | null>(null!);

    useLayoutEffect(() => {
      if (game.current === null) {
        game.current = StartGame("game-container", gameOptions);

        if (typeof ref === "function") {
          ref({ game: game.current, scene: null });
        } else if (ref) {
          ref.current = { game: game.current, scene: null };
        }
      }

      return () => {
        if (game.current) {
          game.current.destroy(true);
          if (game.current !== null) {
            game.current = null;
          }
        }
      };
    }, [ref, gameOptions]);

    useEffect(() => {
      EventBus.on("current-scene-ready", (scene_instance: Phaser.Scene) => {
        if (currentActiveScene && typeof currentActiveScene === "function") {
          currentActiveScene(scene_instance);
        }

        if (typeof ref === "function") {
          ref({ game: game.current, scene: scene_instance });
        } else if (ref) {
          ref.current = { game: game.current, scene: scene_instance };
        }
      });
      return () => {
        EventBus.removeListener("current-scene-ready");
      };
    }, [currentActiveScene, ref]);

    useEffect(() => {
      if (game.current) {
        EventBus.emit("update-game-options", gameOptions);
      }
    }, [gameOptions]);

    return <div id="game-container"></div>;
  })
);

PhaserGame.displayName = "PhaserGame";

