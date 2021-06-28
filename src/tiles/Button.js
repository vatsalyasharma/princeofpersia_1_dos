"use strict";

PrinceJS.Tile.Button = function (game, element, modifier, type) {
  PrinceJS.Tile.Base.call(this, game, element, modifier, type);

  this.stepMax = element === PrinceJS.Level.TILE_RAISE_BUTTON ? 3 : 5;
  this.step = 0;

  this.onPushed = new Phaser.Signal();

  this.active = false;
  this.mute = false;

  this.frontBevel = this.game.make.sprite(0, 0, this.key, this.key + "_" + element + "_fg");
  this.front.addChild(this.frontBevel);

  if (element === PrinceJS.Level.TILE_STUCK_BUTTON) {
    this.debris = true;
    this.mute = true;
  }
};

PrinceJS.Tile.Button.prototype = Object.create(PrinceJS.Tile.Base.prototype);
PrinceJS.Tile.Button.prototype.constructor = PrinceJS.Tile.Button;

PrinceJS.Tile.Button.prototype.update = function () {
  if (this.active && this.element === PrinceJS.Level.TILE_RAISE_BUTTON && this.step === 0) {
    this.trigger();
  }

  if (this.debris) {
    if (!this.active) {
      this.active = true;
      this.step = 0;
      this.trigger();
      if (!this.mute) {
        this.game.sound.play("FloorButton");
      }
    }
    if (this.frontOriginalY !== undefined) {
      this.reset();
    }
    return;
  }

  if (this.active) {
    if (this.step === this.stepMax) {
      this.reset();
      this.active = false;
    }
    this.step++;
  }
};

PrinceJS.Tile.Button.prototype.reset = function () {
  this.front.y = this.frontOriginalY;
  delete this.frontOriginalY;
  this.back.frameName = this.key + "_" + this.element;
  this.offsetY = 0;
};

PrinceJS.Tile.Button.prototype.push = function () {
  if (!this.active) {
    this.active = true;
    this.offsetY = 1;
    this.frontOriginalY = this.front.y;
    this.front.y += this.offsetY;

    this.back.frameName += "_down";
    this.trigger();
    if (!this.mute) {
      this.game.sound.play("FloorButton");
    }
  }
  this.step = 0;
};

PrinceJS.Tile.Button.prototype.trigger = function () {
  this.onPushed.dispatch(this.modifier, this.element);
};
