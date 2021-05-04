"use strict";

PrinceJS.Utils = {
  convertX: function (x) {
    return Math.floor((x * 320) / 140);
  },

  convertXtoBlockX: function (x) {
    return Math.floor((x - 7) / 14);
  },

  convertYtoBlockY: function (y) {
    return Math.floor(y / PrinceJS.BLOCK_HEIGHT);
  },

  convertBlockXtoX: function (block) {
    return block * 14 + 7;
  },

  convertBlockYtoY: function (block) {
    return (block + 1) * PrinceJS.BLOCK_HEIGHT - 10;
  },

  delayed: function (fn, millis) {
    return new Promise((resolve) => {
      setTimeout(() => {
        Promise.resolve()
          .then(() => {
            return fn && fn();
          })
          .then((result) => {
            resolve(result);
          });
      }, millis);
    });
  },

  perform: function (fn, millis) {
    return new Promise((resolve) => {
      let result = fn && fn();
      setTimeout(() => {
        resolve(result);
      }, millis);
    });
  },

  flashScreen: function (game, count, color, time) {
    for (let i = 0; i < count * 2; i++) {
      PrinceJS.Utils.delayed(() => {
        game.stage.backgroundColor = i % 2 === 0 ? color : 0x000000;
      }, time * i);
    }
  },

  flashPattern: function (game, color, pattern) {
    return pattern.reduce((promise, time) => {
      return promise.then(() => {
        PrinceJS.Utils.flashScreen(game, 1, color, time);
        return PrinceJS.Utils.delayed(undefined, 4 * time);
      });
    }, Promise.resolve());
  },

  flashRedDamage: function (game) {
    PrinceJS.Utils.flashPattern(game, PrinceJS.Level.FLASH_RED, [25]);
  },

  flashRedPotion: function (game) {
    PrinceJS.Utils.flashPattern(game, PrinceJS.Level.FLASH_RED, [50, 25, 25]);
  },

  flashGreenPotion: function (game) {
    PrinceJS.Utils.flashPattern(game, PrinceJS.Level.FLASH_GREEN, [50, 25, 25]);
  },

  flashYellowSword: function (game) {
    PrinceJS.Utils.flashPattern(game, PrinceJS.Level.FLASH_YELLOW, [50, 25, 25, 50, 25, 25, 25]);
  },

  flashWhiteShadowMerge: function (game) {
    PrinceJS.Utils.flashPattern(game, PrinceJS.Level.FLASH_WHITE, [
      50,
      25,
      25,
      50,
      25,
      25,
      25,
      50,
      25,
      25,
      50,
      25,
      25,
      25
    ]);
  },

  flashWhiteVizierVictory: function (game) {
    PrinceJS.Utils.flashPattern(game, PrinceJS.Level.FLASH_WHITE, [25, 25, 100, 100, 50, 50, 25, 25, 50]);
  },

  random: function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  },

  pointerPressed: function (game) {
    if (PrinceJS.Utils._pointerTimer > 0) {
      PrinceJS.Utils._pointerTimer--;
    } else {
      PrinceJS.Utils._pointerTimer = 0;
    }
    if (PrinceJS.Utils._pointerTimer === 0 && PrinceJS.Utils.pointerDown(game)) {
      PrinceJS.Utils._pointerTimer = 25;
      return true;
    }
    return false;
  },

  pointerDown: function (game) {
    if (game.input.activePointer.leftButton && game.input.activePointer.leftButton.isDown) {
      return true;
    }
    if (game.input.activePointer.isDown) {
      return true;
    }
    if (game.input.pointer1.isDown) {
      return true;
    }
    return game.input.pointer2.isDown;
  },

  effectivePointer: function (game) {
    let width = document.getElementsByTagName("canvas")[0].getBoundingClientRect().width;
    let height = document.getElementsByTagName("canvas")[0].getBoundingClientRect().height;
    let size = PrinceJS.Utils.effectiveScreenSize(game);
    let x =
      game.input.activePointer.x ||
      (game.input.pointer1.isDown && game.input.pointer1.x) ||
      (game.input.pointer2.isDown && game.input.pointer2.x) ||
      0;
    let y =
      game.input.activePointer.y ||
      (game.input.pointer1.isDown && game.input.pointer1.y) ||
      (game.input.pointer2.isDown && game.input.pointer2.y) ||
      0;
    return {
      x: x - (width - size.width) / 2,
      y: y - (height - size.height) / 2
    };
  },

  effectiveScreenSize: function (game) {
    let width = document.getElementsByTagName("canvas")[0].getBoundingClientRect().width;
    let height = document.getElementsByTagName("canvas")[0].getBoundingClientRect().height;
    if (width / height >= PrinceJS.WORLD_RATIO) {
      return {
        width: height * PrinceJS.WORLD_RATIO,
        height
      };
    } else {
      return {
        width,
        height: width / PrinceJS.WORLD_RATIO
      };
    }
  },

  gameContainer: function () {
    return document.getElementById("gameContainer");
  },

  resetFlipScreen: function () {
    PrinceJS.Utils.gameContainer().classList.remove("flipped");
  },

  toggleFlipScreen: function () {
    PrinceJS.Utils.gameContainer().classList.toggle("flipped");
  },

  isScreenFlipped: function () {
    return PrinceJS.Utils.gameContainer().classList.contains("flipped");
  },

  setRemainingMinutesTo15() {
    if (PrinceJS.Utils.getRemainingMinutes() > 15) {
      PrinceJS.Utils.minutes = 15;
      let date = new Date();
      date.setMinutes(date.getMinutes() - (60 - PrinceJS.Utils.minutes));
      PrinceJS.startTime = date;
      PrinceJS.Utils.updateQuery();
    }
  },

  getDeltaTime: function () {
    if (!PrinceJS.startTime) {
      return {
        minutes: -1,
        seconds: -1
      };
    }
    let diff = (PrinceJS.endTime || new Date()).getTime() - PrinceJS.startTime.getTime();
    let minutes = Math.floor(diff / 60000);
    let seconds = Math.floor(diff / 1000) % 60;
    return { minutes, seconds };
  },

  getRemainingMinutes: function () {
    let deltaTime = PrinceJS.Utils.getDeltaTime();
    return Math.min(60, Math.max(0, 60 - deltaTime.minutes));
  },

  getRemainingSeconds: function () {
    let deltaTime = PrinceJS.Utils.getDeltaTime();
    return Math.min(60, Math.max(0, 60 - deltaTime.seconds));
  },

  applyStrength: function (value) {
    if (PrinceJS.strength >= 0 && PrinceJS.strength < 100) {
      return Math.ceil((value * PrinceJS.strength) / 100);
    }
    return value;
  },

  applyQuery: function () {
    let query = new URLSearchParams(window.location.search);
    if (query.get("level")) {
      let queryLevel = parseInt(query.get("level"), 10);
      if (!isNaN(queryLevel) && queryLevel >= 1 && queryLevel <= 14) {
        PrinceJS.currentLevel = queryLevel;
      }
    }
    if (query.get("health")) {
      let queryHealth = parseInt(query.get("health"), 10);
      if (!isNaN(queryHealth) && queryHealth >= 3 && queryHealth <= 10) {
        PrinceJS.maxHealth = queryHealth;
      }
    }
    if (query.get("time")) {
      let queryTime = parseInt(query.get("time"), 10);
      if (!isNaN(queryTime) && queryTime >= 1 && queryTime <= 60) {
        PrinceJS.minutes = queryTime;
      }
    }
    if (query.get("strength")) {
      let queryStrength = parseInt(query.get("strength"), 10);
      if (!isNaN(queryStrength) && queryStrength >= 0 && queryStrength <= 100) {
        PrinceJS.strength = queryStrength;
      }
    }
    if (query.get("width")) {
      let queryWidth = parseInt(query.get("width"), 10);
      if (!isNaN(queryWidth) && queryWidth > 0) {
        PrinceJS.screenWidth = queryWidth;
      }
    }

    if (query.get("fullscreen")) {
      PrinceJS.screenFull = query.get("fullscreen") === "true";
      if (PrinceJS.screenFull) {
        PrinceJS.Utils.gameContainer().classList.add("fullscreen");
      } else {
        PrinceJS.Utils.gameContainer().classList.remove("fullscreen");
      }
    }
  },

  applyScreenWidth() {
    if (PrinceJS.screenWidth > 0) {
      PrinceJS.Utils.gameContainer().style["max-width"] = `${PrinceJS.screenWidth}px`;
    }
  },

  updateQuery: function () {
    PrinceJS.minutes = PrinceJS.Utils.getRemainingMinutes();
    PrinceJS.Utils.setHistoryState({
      level: PrinceJS.currentLevel,
      health: PrinceJS.maxHealth,
      time: PrinceJS.minutes,
      strength: PrinceJS.strength,
      width: PrinceJS.screenWidth,
      fullscreen: PrinceJS.screenFull
    });
  },

  restoreQuery: function () {
    if (PrinceJS.Utils.getRemainingMinutes() < PrinceJS.minutes) {
      let date = new Date();
      date.setMinutes(date.getMinutes() - (60 - PrinceJS.minutes));
      PrinceJS.startTime = date;
    }
  },

  clearQuery: function () {
    PrinceJS.Utils.setHistoryState({
      strength: PrinceJS.strength,
      width: PrinceJS.screenWidth,
      fullscreen: PrinceJS.screenFull
    });
  },

  setHistoryState(state) {
    history.replaceState(
      null,
      null,
      "?" +
        Object.keys(state)
          .map((key) => `${key}=${state[key]}`)
          .join("&")
    );
  }
};
